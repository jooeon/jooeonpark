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

const colors = ["#ff800c", "#78e2ff", "#ba3bff", "#ff33a1", "#0dff86", "#6021ff", "#ffed5e"];

// Randomize subtitle color
export function pickRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
};