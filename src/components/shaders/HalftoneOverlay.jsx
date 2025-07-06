import { useRef, useEffect } from 'react';
import PropTypes from "prop-types";
import {generateShades} from "../../Utils.jsx";

// Vertex shader - positions vertices
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Enhanced halftone fragment shader with dynamic color palette
const halftoneImageFragmentShader = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform sampler2D u_image;
  uniform bool u_hasImage;
  uniform float u_gridSize;
  uniform bool u_invertBrightness;
  
  // Color palette uniforms
  uniform vec3 u_color1; // darkest
  uniform vec3 u_color2; // dark
  uniform vec3 u_color3; // mid
  uniform vec3 u_color4; // bright
  uniform vec3 u_color5; // brightest
  
  float circle(vec2 position, float radius) {
    return length(position) - radius;
  }
  
  // Convert to grayscale
  float luminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }
  
  // Color palette interpolation using dynamic colors
  vec3 getColorFromDotSize(float normalizedRadius) {
    // Map normalized radius (0.0 to 1.0) to color palette
    // Larger dots (higher values) get brighter colors
    if (normalizedRadius < 0.25) {
      return mix(u_color1, u_color2, normalizedRadius * 4.0);
    } else if (normalizedRadius < 0.5) {
      return mix(u_color2, u_color3, (normalizedRadius - 0.25) * 4.0);
    } else if (normalizedRadius < 0.75) {
      return mix(u_color3, u_color4, (normalizedRadius - 0.5) * 4.0);
    } else {
      return mix(u_color4, u_color5, (normalizedRadius - 0.75) * 4.0);
    }
  }
  
  void main() {
    vec2 st = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    // Fixed grid size for dots
    float gridSize = u_gridSize;
    vec2 grid = fract(st * gridSize);
    vec2 gridIndex = floor(st * gridSize);
    
    // Calculate distance from mouse
    float mouseDist = distance(st, mouse);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist);
    
    // Get the color from the image at this grid cell
    vec2 cellCenter = (gridIndex + 0.5) / gridSize;
    vec3 imageColor = u_hasImage ? texture2D(u_image, cellCenter).rgb : vec3(0.5);
    
    // Convert to grayscale to determine dot size
    float brightness = luminance(imageColor);
    
    // Apply brightness inversion based on uniform
    float dotSizeFactor = u_invertBrightness ? (1.0 - brightness) : brightness;
    
    // Base radius based on image brightness
    float baseRadius = 0.45;
    float radius = baseRadius * dotSizeFactor;
    
    // Wave-like breathing effect
    // Create ripples from center and multiple wave sources
    vec2 center = vec2(0.5, 0.5);
    float distFromCenter = distance(st, center);
    
    // Multiple wave sources for complex patterns
    float wave1 = sin(u_time * 1.8 + distFromCenter * 15.0) * 0.11;
    float wave2 = sin(u_time * 1.3 + st.x * 10.0) * 0.06;
    float wave3 = sin(u_time * 1.6 + st.y * 12.0) * 0.06;
    float wave4 = sin(u_time * 2.3 + (st.x + st.y) * 8.0) * 0.04;
    
    // Combine waves for complex breathing pattern
    float breathingEffect = 1.0 + wave1 + wave2 + wave3 + wave4;
    
    // Clamp the breathing effect to prevent negative or extreme values
    breathingEffect = clamp(breathingEffect, 0.5, 1.5);
    
    // Apply breathing effect to radius
    radius *= breathingEffect;
    
    // Mouse interaction
    // radius *= 1.0 - mouseInfluence * 0.5;
    
    // Create dots
    float dot = circle(grid - 0.5, radius);
    float dotMask = smoothstep(0.02, 0.0, dot);
    
    // Background color (darkest color from palette)
    vec3 backgroundColor = u_color1;
    
    // Get dot color based on normalized radius (0.0 to 1.0)
    float normalizedRadius = radius / baseRadius;
    vec3 dotColor = getColorFromDotSize(normalizedRadius);
    
    vec3 color = mix(backgroundColor, dotColor, dotMask);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const HalftoneOverlayShader = ({ imageUrl, gridSize = 80.0, baseColor = "#2DB5B4", invertBrightness = false }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mousePosRef = useRef({ x: 0, y: 0 });
    const glRef = useRef(null);
    const programRef = useRef(null);
    const textureRef = useRef(null);
    const startTimeRef = useRef(Date.now());
    const hasImageRef = useRef(false);
    const gridSizeRef = useRef(gridSize);
    const colorShadesRef = useRef(generateShades(baseColor));
    const invertBrightnessRef = useRef(invertBrightness);

    // Update refs when props change
    useEffect(() => {
        gridSizeRef.current = gridSize;
    }, [gridSize]);

    useEffect(() => {
        if (baseColor === 'original') {
            // Use original hardcoded colors
            colorShadesRef.current = [
                [0.02, 0.08, 0.08],
                [0.05, 0.25, 0.25],
                [0.10, 0.45, 0.45],
                [0.17, 0.69, 0.68],
                [0.30, 0.85, 0.85]
            ];
        } else {
            colorShadesRef.current = generateShades(baseColor);
        }
    }, [baseColor]);

    useEffect(() => {
        invertBrightnessRef.current = invertBrightness;
    }, [invertBrightness]);

    // Cleanup function for WebGL resources
    const cleanupWebGL = () => {
        const gl = glRef.current;
        if (!gl) return;

        if (textureRef.current) gl.deleteTexture(textureRef.current);
        if (programRef.current) gl.deleteProgram(programRef.current);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

    // Load image and create texture
    const loadImageTexture = (gl, url) => {
        if (!url) {
            if (textureRef.current) {
                gl.deleteTexture(textureRef.current);
                textureRef.current = null;
            }
            hasImageRef.current = false;
            return;
        }

        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            const newTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, newTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            if (textureRef.current) gl.deleteTexture(textureRef.current);
            textureRef.current = newTexture;
            hasImageRef.current = true;
        };
        image.src = url;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        glRef.current = gl;

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        // Compile shaders
        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(halftoneImageFragmentShader, gl.FRAGMENT_SHADER);
        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }

        programRef.current = program;

        // Geometry (two triangles)
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        const texCoords = new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse');
        const imageLocation = gl.getUniformLocation(program, 'u_image');
        const hasImageLocation = gl.getUniformLocation(program, 'u_hasImage');
        const gridSizeLocation = gl.getUniformLocation(program, 'u_gridSize');
        const invertBrightnessLocation = gl.getUniformLocation(program, 'u_invertBrightness');

        // Color palette uniform locations
        const color1Location = gl.getUniformLocation(program, 'u_color1');
        const color2Location = gl.getUniformLocation(program, 'u_color2');
        const color3Location = gl.getUniformLocation(program, 'u_color3');
        const color4Location = gl.getUniformLocation(program, 'u_color4');
        const color5Location = gl.getUniformLocation(program, 'u_color5');

        // Load image if provided
        if (imageUrl) loadImageTexture(gl, imageUrl);

        // Reset time
        startTimeRef.current = Date.now();

        // Animation loop
        const animate = () => {
            const currentTime = (Date.now() - startTimeRef.current) * 0.001;
            const shades = colorShadesRef.current;

            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);
            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform2f(mouseLocation, mousePosRef.current.x, mousePosRef.current.y);
            gl.uniform1i(hasImageLocation, hasImageRef.current ? 1 : 0);
            gl.uniform1f(gridSizeLocation, gridSizeRef.current);
            gl.uniform1i(invertBrightnessLocation, invertBrightnessRef.current ? 1 : 0);

            // Set color palette uniforms
            gl.uniform3fv(color1Location, shades[0]);
            gl.uniform3fv(color2Location, shades[1]);
            gl.uniform3fv(color3Location, shades[2]);
            gl.uniform3fv(color4Location, shades[3]);
            gl.uniform3fv(color5Location, shades[4]);

            if (hasImageRef.current && textureRef.current) {
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
                gl.uniform1i(imageLocation, 0);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.enableVertexAttribArray(texCoordLocation);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

            // Draw regardless of image state (will show pattern with default colors)
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cleanupWebGL();
        };
    }, []);

    useEffect(() => {
        if (glRef.current) loadImageTexture(glRef.current, imageUrl);
    }, [imageUrl]);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {}}
        />
    );
};

HalftoneOverlayShader.propTypes = {
    imageUrl: PropTypes.string,
    gridSize: PropTypes.number,
    baseColor: PropTypes.string,
    invertBrightness: PropTypes.bool,
};

export default HalftoneOverlayShader;