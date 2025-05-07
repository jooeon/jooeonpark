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