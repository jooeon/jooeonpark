import { useRef, useEffect } from 'react';

// Vertex shader - positions vertices
const vertexShaderSource = `
  attribute vec2 a_position;
  
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Fragment shader with warped grid effect
const fragmentShaderSource = `
#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 2D Random function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Noise function (Value Noise)
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractional Brownian Motion to create more complex, layered noise
float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Color mapping function - maps a noise value (0-1) to a color gradient
vec3 colorMap(float t) {
    vec3 deepBlue = vec3(0.1, 0.0, 0.4);
    vec3 midBlue = vec3(0.2, 0.2, 0.8);
    vec3 orange = vec3(1.0, 0.5, 0.0);
    vec3 yellow = vec3(1.0, 1.0, 0.0);
    vec3 brightRed = vec3(1.0, 0.2, 0.2);
    vec3 white = vec3(1.0, 1.0, 1.0);

    // Smoothstep creates nice transitions between colors
    t = smoothstep(0.2, 0.8, t); // Clamp and smooth the input range

    vec3 color = mix(deepBlue, midBlue, smoothstep(0.0, 0.3, t));
    color = mix(color, orange, smoothstep(0.3, 0.5, t));
    color = mix(color, yellow, smoothstep(0.5, 0.7, t));
    color = mix(color, brightRed, smoothstep(0.65, 0.8, t));
    color = mix(color, white, smoothstep(0.75, 0.9, t));
    
    return color;
}

void main() {
    // Normalize coordinates and adjust for aspect ratio to prevent stretching
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspectRatio = u_resolution.x / u_resolution.y;
    uv.x *= aspectRatio;
    
    // Mouse position normalized and aspect corrected
    vec2 mouse = u_mouse / u_resolution;
    mouse.x *= aspectRatio;
    
    // Calculate mouse influence for color shift
    float mouseDist = distance(uv, mouse);
    float mouseInfluence = exp(-mouseDist * 9.0); // Always calculate influence

    // --- Procedural Blobs ---
    // Scale and animate the coordinates for the noise function
    vec2 noiseCoord = uv * 3.0; // No displacement, just original coordinates
    noiseCoord.x += u_time * 0.1;
    noiseCoord.y += u_time * 0.05;
    
    // Generate the base noise value
    float noiseValue = fbm(noiseCoord);

    // Add a second, slower, larger noise pattern for more variation
    vec2 noiseCoord2 = uv * 1.5 + vec2(u_time * -0.05);
    noiseValue = (noiseValue + fbm(noiseCoord2)) / 2.0;
    
    // Shift noise value based on mouse proximity - makes colors "hotter" near mouse
    noiseValue = mix(noiseValue, min(noiseValue + 0.3, 1.0), mouseInfluence);

    // Get the color from the noise value
    vec3 bgColor = colorMap(noiseValue);
    
    // Add shimmer effect near mouse - brightens colors
    bgColor = mix(bgColor, bgColor * 1.3, mouseInfluence * 0.5);

    // --- Grid ---
    // Displace grid coordinates with the noise to create the warp effect
    vec2 gridUv = uv + vec2(noiseValue * 3.0);
    
    float gridSize = 40.0;
    // Use derivatives to keep grid lines anti-aliased and a consistent thickness
    vec2 fw = fwidth(gridUv * gridSize);
    vec2 grid = abs(fract(gridUv * gridSize - 0.5) - 0.5) / fw;
    float line = 1.0 - min(min(grid.x, grid.y), 1.0);

    // Make the grid darker and slightly colored
    vec3 gridColor = vec3(0.1, 0.1, 0.2) * line;
    
    // --- Final Composition ---
    // Combine the background color and the grid.
    // Using multiply gives a nice blend where the grid darkens the background.
    vec3 finalColor = bgColor * (1.0 - gridColor);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const HeatmapShader = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl', {
            antialias: true,
            preserveDrawingBuffer: true
        });

        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Enable OES_standard_derivatives extension
        const ext = gl.getExtension('OES_standard_derivatives');
        if (!ext) {
            console.error('OES_standard_derivatives not supported');
            return;
        }

        // Set canvas size
        const resize = () => {
            canvas.width = canvas.clientWidth * window.devicePixelRatio;
            canvas.height = canvas.clientHeight * window.devicePixelRatio;
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
        const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

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

        // Create buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        // Get attribute location
        const positionLocation = gl.getAttribLocation(program, 'a_position');

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
            gl.uniform2f(mouseLocation,
                mousePosRef.current.x * window.devicePixelRatio,
                (canvas.height / window.devicePixelRatio - mousePosRef.current.y) * window.devicePixelRatio
            );

            // Bind position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionLocation);
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

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
        // Keep the last mouse position - no sudden changes
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

export default HeatmapShader;