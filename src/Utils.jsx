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
export function checkWebGL() {
    try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
    } catch {
        return false;
    }
}


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