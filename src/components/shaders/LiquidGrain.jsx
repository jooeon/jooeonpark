import React, { useRef, useEffect } from 'react';

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

// Grainy liquid flow fragment shader
const grainyLiquidFragmentShader = `
  precision mediump float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  
  // Film grain
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }
  
  // Smooth noise for flow
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  // Fractal noise for organic shapes
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  // Warped domain for liquid flow
  float pattern(vec2 st, float time) {
    vec2 q = vec2(0.0);
    q.x = fbm(st + vec2(0.0, 0.0));
    q.y = fbm(st + vec2(5.2, 1.3));
    
    vec2 r = vec2(0.0);
    r.x = fbm(st + 4.0 * q + vec2(1.7, 9.2) + time * 0.15);
    r.y = fbm(st + 4.0 * q + vec2(8.3, 2.8) + time * 0.12);
    
    return fbm(st + 4.0 * r);
  }
  
  void main() {
    vec2 st = v_texCoord;
    vec2 mouse = u_mouse / u_resolution;
    
    // Create flowing pattern
    float flow = pattern(st * 3.0, u_time);
    
    // Mouse interaction - creates ripples in the flow
    float mouseDist = distance(st, mouse);
    float mouseInfluence = smoothstep(2.0, 0.0, mouseDist);
    flow += sin(mouseDist * 3.0 - u_time * 1.0) * mouseInfluence * 0.2;
    
    // Create bands/layers
    flow = pow(flow, 1.5);
    float bands = smoothstep(0.2, 0.3, flow) - smoothstep(0.7, 0.8, flow);
    
    // Heavy film grain
    float grain = random(st * 1000.0 + vec2(u_time * 100.0, 0.0));
    grain = grain * 0.5 + 0.5;
    
    // Color palette inspired by the images
    vec3 black = vec3(0.05, 0.02, 0.08);
    vec3 darkPurple = vec3(0.2, 0.1, 0.3);
    vec3 midPurple = vec3(0.5, 0.3, 0.65);
    vec3 brightPurple = vec3(0.75, 0.5, 0.85);
    vec3 lavender = vec3(0.9, 0.8, 0.95);
    
    // Map flow to colors
    vec3 color;
    if (flow < 0.2) {
      color = mix(black, darkPurple, flow * 5.0);
    } else if (flow < 0.4) {
      color = mix(darkPurple, midPurple, (flow - 0.2) * 5.0);
    } else if (flow < 0.6) {
      color = mix(midPurple, brightPurple, (flow - 0.4) * 5.0);
    } else if (flow < 0.8) {
      color = mix(brightPurple, lavender, (flow - 0.6) * 5.0);
    } else {
      color = mix(lavender, black, (flow - 0.8) * 5.0);
    }
    
    // Add depth with multiple layers
    float flow2 = pattern(st * 2.0 + vec2(100.0), u_time * 1.2);
    vec3 color2 = flow2 < 0.5 ? black : darkPurple;
    color = mix(color, color2, 0.3);
    
    // Apply heavy grain
    // color *= grain * 0.7 + 0.5;
    
    // Add grain texture
    float grainPattern = random(st * 500.0);
    if (grainPattern > 0.95) {
      color *= 0.7;
    } else if (grainPattern < 0.05) {
      color *= 1.3;
    }
    
    // Subtle vignette
    float vignette = 1.2 - distance(st, vec2(0.5)) * 0.5;
    color *= vignette;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const LiquidGrainShader = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

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
        const fragmentShader = compileShader(grainyLiquidFragmentShader, gl.FRAGMENT_SHADER);

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

            // Set uniforms - Y coordinate is NOT flipped
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
    }, []);

    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        mousePosRef.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleMouseLeave = () => {
        // Keep last position - no sudden changes
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

export default LiquidGrainShader;