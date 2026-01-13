// call on pages that need to begin at top of page on load, like so:
//   const lenis = useLenis();
//   useEffect(() => {
//     scrollToTop(lenis);
//   }, [lenis]);
export function scrollToTop(lenis, immediate = true) {
    if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate });
    } else {
        window.scrollTo(0, 0);
    }
}

const colors = ["#ff800c", "#78e2ff", "#ba3bff", "#ff33a1", "#0dff86", "#6021ff", "#ffed5e"]

// Randomize subtitle color
export function pickRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// convert to lowercase and remove special characters
export function formatString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "") // Remove all non-alphanumeric characters
}

// for checking if WebGL is compatible to browser
// return true if
let webglSupported = null;

export function checkWebGL() {
    if (webglSupported !== null) return webglSupported;

    console.log('Active WebGL contexts:', document.querySelectorAll('canvas').length);
    try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");

        if (gl) {
            const loseContext = gl.getExtension('WEBGL_lose_context');
            if (loseContext) {
                loseContext.loseContext();
            }
            webglSupported = true;
        } else {
            webglSupported = false;
        }
        return webglSupported;
    } catch {
        webglSupported = false;
        return false;
    }
}

// Cleanup function for WebGL resources
export const cleanupWebGL = (glRef, textureRef, programRef, animationRef) => {
    const gl = glRef.current;
    if (!gl) return;

    if (textureRef.current) gl.deleteTexture(textureRef.current);
    if (programRef.current) gl.deleteProgram(programRef.current);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
};

// Cloudflare Worker URL for click-counter
const WORKER_URL = 'https://click-counter.jooeon427.workers.dev';

// Function to increment counter
export const incrementCounter = async () => {
    try {
        const response = await fetch(`${WORKER_URL}/clicks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('Counter incremented:', data.count);
        return data.count;
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error - server might be down:', error.message);
        } else {
            console.error('Error incrementing counter:', error.message);
        }
        return null;
    }
};

export const getCounter = async () => {
    try {
        const response = await fetch(`${WORKER_URL}/clicks`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.count;
    } catch (error) {
        if (error.name === 'TypeError') {
            console.error('Network error - server might be down:', error.message);
        } else {
            console.error('Error getting counter:', error.message);
        }
        return null;
    }
};

export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
    ] : [0.5, 0.5, 0.5];
};

export const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
        const hex = Math.round(n * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const generateShades = (targetColor) => {
    const rgb = typeof targetColor === 'string' ? hexToRgb(targetColor) : targetColor;

    // Calculate overall brightness (luminance) instead of just max channel
    const luminance = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;

    // If the color is very dark (like black), create a monochromatic progression
    if (luminance < 0.1) {
        return [
            [0.02, 0.02, 0.02],          // darkest
            [0.05, 0.05, 0.05],          // dark
            [0.15, 0.15, 0.15],          // mid
            [0.35, 0.35, 0.35],          // bright
            [0.65, 0.65, 0.65]           // brightest
        ];
    }

    // If the color is very bright AND neutral (like white), create a monochromatic progression
    const colorVariance = Math.max(rgb[0], rgb[1], rgb[2]) - Math.min(rgb[0], rgb[1], rgb[2]);
    if (luminance > 0.9 && colorVariance < 0.1) {
        return [
            [0.15, 0.15, 0.15],          // darkest
            [0.35, 0.35, 0.35],          // dark
            [0.55, 0.55, 0.55],          // mid
            [0.75, 0.75, 0.75],          // bright
            [0.95, 0.95, 0.95]           // brightest
        ];
    }

    // For all other colors (including pure red, blue, etc.), create a progression based on the actual color
    const baseIntensity = 0.02;
    return [
        [
            Math.max(baseIntensity, rgb[0] * 0.1),
            Math.max(baseIntensity, rgb[1] * 0.1),
            Math.max(baseIntensity, rgb[2] * 0.1)
        ],                           // darkest - very dark version of the color
        [
            Math.max(0.05, rgb[0] * 0.4),
            Math.max(0.05, rgb[1] * 0.4),
            Math.max(0.05, rgb[2] * 0.4)
        ],                           // dark - low saturation version
        [
            Math.max(0.10, rgb[0] * 0.7),
            Math.max(0.10, rgb[1] * 0.7),
            Math.max(0.10, rgb[2] * 0.7)
        ],                           // mid - medium saturation
        [
            Math.min(0.95, Math.max(0.17, rgb[0] * 0.9)),
            Math.min(0.95, Math.max(0.17, rgb[1] * 0.9)),
            Math.min(0.95, Math.max(0.17, rgb[2] * 0.9))
        ],                           // bright - close to actual color
        [
            Math.min(1.0, rgb[0] * 1.1),
            Math.min(1.0, rgb[1] * 1.1),
            Math.min(1.0, rgb[2] * 1.1)
        ]                            // brightest - enhanced version
    ];
};