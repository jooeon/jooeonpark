import { useRef, useEffect } from 'react';

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

// Halftone fragment shader - metallic silver satin effect
const halftoneFragmentShader = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  float circle(vec2 position, float radius) {
    return length(position) - radius;
  }
  
  void main() {
    vec2 st = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    // Create flowing wave distortion for fabric-like movement
    float waveFreq1 = 3.0;
    float waveFreq2 = 2.3;
    float waveAmp = 0.08;
    
    // Multiple wave layers for complex fabric movement
    float wave1 = sin(st.x * waveFreq1 + u_time * 0.5) * sin(st.y * waveFreq1 * 0.7 + u_time * 0.3);
    float wave2 = sin(st.x * waveFreq2 - u_time * 0.4) * sin(st.y * waveFreq2 * 1.1 - u_time * 0.6);
    
    // Combine waves for organic movement
    vec2 displacement = vec2(
      wave1 * waveAmp + wave2 * waveAmp * 0.5,
      wave2 * waveAmp + wave1 * waveAmp * 0.5
    );
    
    // Apply displacement
    vec2 distortedSt = st + displacement;
    
    // Create finer grid for smaller dots
    float gridSize = 80.0; // Much finer grid for halftone effect
    vec2 grid = fract(distortedSt * gridSize);
    
    // Calculate dot size based on position and waves
    // This creates the light/dark gradient effect
    float gradient = 0.5 + 0.5 * sin(distortedSt.x * 2.0 + wave1 * 3.0) * sin(distortedSt.y * 2.0 + wave2 * 3.0);
    
    // Mouse influence - create a subtle wave disturbance
    float mouseDist = distance(st, mouse);
    float mouseWave = sin(mouseDist * 20.0 - u_time * 2.0) * exp(-mouseDist * 3.0) * 0.3;
    gradient += mouseWave;
    
    // Vary dot size based on gradient
    float baseRadius = 0.35;
    float radius = baseRadius * (1.0 - gradient * 0.7);
    
    // Create dots
    float dot = circle(grid - 0.5, radius);
    float dotMask = 1.0 - smoothstep(0.0, 0.02, dot);
    
    // Metallic silver-blue colors
    vec3 darkMetal = vec3(0.08, 0.1, 0.12);   // Dark blue-gray
    vec3 midMetal = vec3(0.25, 0.28, 0.32);   // Medium silver
    vec3 lightMetal = vec3(0.45, 0.48, 0.52); // Light silver
    vec3 highlight = vec3(0.65, 0.68, 0.72);  // Bright silver
    
    // Create metallic gradient based on wave position
    float metallic = gradient + wave1 * 0.2;
    
    // Mix colors for metallic sheen
    vec3 color = darkMetal;
    color = mix(color, midMetal, smoothstep(0.2, 0.4, metallic));
    color = mix(color, lightMetal, smoothstep(0.4, 0.6, metallic));
    color = mix(color, highlight, smoothstep(0.6, 0.9, metallic));
    
    // Apply halftone pattern
    color = mix(darkMetal, color, dotMask);
    
    // Add subtle shimmer based on viewing angle
    float shimmer = abs(sin(distortedSt.x * 100.0 + distortedSt.y * 100.0 + u_time * 2.0)) * 0.05;
    color += shimmer * smoothstep(0.5, 0.9, metallic);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const HalftoneShader = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mousePosRef = useRef({ x: -1000, y: -1000 }); // Start far off screen

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        // Compile shader function
        const compileShader = (source, type) => {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        };

        // Create shader program
        const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
        const fragmentShader = compileShader(halftoneFragmentShader, gl.FRAGMENT_SHADER);

        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }

        // Setup geometry (two triangles making a rectangle)
        const positions = new Float32Array([
            -1, -1,
            1, -1,
            -1,  1,
            -1,  1,
            1, -1,
            1,  1,
        ]);

        const texCoords = new Float32Array([
            0, 1,
            1, 1,
            0, 0,
            0, 0,
            1, 1,
            1, 0,
        ]);

        // Create buffers
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

        // Get attribute locations
        const positionLocation = gl.getAttribLocation(program, 'a_position');
        const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');

        // Get uniform locations
        const timeLocation = gl.getUniformLocation(program, 'u_time');
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

        // Animation loop
        let startTime = Date.now();
        const animate = () => {
            const currentTime = (Date.now() - startTime) * 0.001;

            // Clear canvas
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Use program
            gl.useProgram(program);

            // Set uniforms
            gl.uniform1f(timeLocation, currentTime);
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
            gl.uniform2f(mouseLocation, mousePosRef.current.x, mousePosRef.current.y);

            // Bind position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

            // Bind texture coordinate buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
            gl.enableVertexAttribArray(texCoordLocation);
            gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

            // Draw
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []); // Removed mousePos from dependencies

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        // Move mouse position far off screen gradually
        // mousePosRef.current = { x: -1000, y: -1000 };
    };

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        />
    );
};

export default HalftoneShader;