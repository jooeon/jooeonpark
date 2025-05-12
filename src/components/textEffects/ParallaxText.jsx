import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, useMotionValue, useAnimationFrame, animate } from "framer-motion";

/**
 * ParallaxText component
 *
 * @param {string[]} textArray - Array of strings to scroll
 * @param {number} baseVelocity - The default speed (px/s) of horizontal scroll
 * [unused]@param {MotionValue<number>} scrollY - The scrollY motion value from Framer Motion (useScroll)
 */
export default function ParallaxText({ textArray, baseVelocity = 100 }) {
    // We still keep a separate `direction` so we know if we should move left or right.
    const [direction, setDirection] = useState("left"); // "left" | "right"

    // Instead of a normal state for velocity, we’ll keep a MotionValue and animate it.
    const velocityMV = useMotionValue(baseVelocity);

    // Track our last scroll position to determine if the user is scrolling up or down.
    // const lastScrollY = useRef(0);

    // A timer to revert speed after user stops scrolling.
    // const revertTimerRef = useRef(null);

    // Track whether the user is actively dragging the text.
    const isDragging = useRef(false);

    // Keep a MotionValue for the x-position of our container
    const x = useMotionValue(0);

    // We need to measure half the container width to know when to “loop” seamlessly.
    const containerRef = useRef(null);
    const [contentWidth, setContentWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // Because we duplicate textArray, half of scrollWidth is one array’s length
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, [textArray]);

    // // Subscribe to scrollY changes so we get a callback every time it updates.
    // useEffect(() => {
    //     const unsubscribe = scrollY.on("change", (latest) => {
    //         // Ignore scroll updates while dragging.
    //         if (isDragging.current) return;
    //
    //         const diff = latest - lastScrollY.current;
    //
    //         if (diff > 0) {
    //             // Scrolling down → text should accelerate left
    //             setDirection("left");
    //             animate(velocityMV, baseVelocity + (isMobile ? 325 : 650), {
    //                 type: "spring",
    //                 stiffness: 50,
    //                 damping: 30,
    //             });
    //         } else if (diff < 0) {
    //             // Scrolling up → text should accelerate right
    //             setDirection("right");
    //             animate(velocityMV, baseVelocity + (isMobile ? 50 : 100), {
    //                 type: "spring",
    //                 stiffness: 50,
    //                 damping: 30,
    //             });
    //         }
    //
    //         lastScrollY.current = latest;
    //
    //         // Clear any existing timer so we don’t stack them.
    //         if (revertTimerRef.current) {
    //             clearTimeout(revertTimerRef.current);
    //         }
    //
    //         // After 150ms of no scroll updates, revert to default.
    //         revertTimerRef.current = setTimeout(() => {
    //             setDirection("left"); // back to default direction
    //             animate(velocityMV, baseVelocity, {
    //                 duration: 0.4,
    //                 ease: "easeOut",
    //             });
    //         }, 150);
    //     });
    //
    //     return () => {
    //         unsubscribe();
    //         // Cleanup any pending timer on unmount.
    //         if (revertTimerRef.current) {
    //             clearTimeout(revertTimerRef.current);
    //         }
    //     };
    // }, [scrollY, baseVelocity, velocityMV]);

    // Use per-frame updates to move the text based on the current velocity.
    useAnimationFrame((_, delta) => {
        // Ignore updates while dragging.
        if (isDragging.current) return;

        // Convert velocity from px/s to px/frame based on delta
        const speed = velocityMV.get();
        const distance = speed * (delta / 1000);

        // direction === "left" → negative, direction === "right" → positive
        const directionFactor = direction === "left" ? -1 : 1;

        // Move
        x.set(x.get() + directionFactor * distance);

        // Wrap around if we’ve moved too far
        const currentX = x.get();
        if (direction === "left" && currentX <= -contentWidth) {
            x.set(currentX + contentWidth);
        } else if (direction === "right" && currentX >= 0) {
            x.set(currentX - contentWidth);
        }
    });

    // Drag handling: Adjust speed and direction based on drag input
    const handleDrag = (_, info) => {
        isDragging.current = true; // Set dragging state
        const dragSpeed = -info.delta.x; // Negative for reversed drag direction
        velocityMV.set(dragSpeed); // Directly set velocity based on drag speed
        setDirection(dragSpeed > 0 ? "right" : "left"); // Adjust direction
    };

    // Handle end of drag: Revert to base velocity
    const handleDragEnd = () => {
        isDragging.current = false; // Reset dragging state
        animate(velocityMV, baseVelocity, { duration: 0.4, ease: "easeOut" }); // Smoothly return to base velocity
    };

    // Duplicate the text array so that the second half follows behind the first.
    const repeatedText = [...textArray, ...textArray];

    return (
        <motion.div
            ref={containerRef}
            className="parallax-text flex whitespace-nowrap cursor-grab"
            style={{ x }} // Apply Framer Motion x transform
            drag="x" // Allow horizontal dragging
            dragConstraints={{ left: -contentWidth, right: contentWidth }} // Restrict drag limits
            dragElastic={0.1} // Add slight resistance to dragging
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
        >
            {repeatedText.map((text, index) => (
                <span key={index} className="mx-10 lg:mx-14 xl:mx-16">
                  {text}
                </span>
            ))}
        </motion.div>
    );
}

ParallaxText.propTypes = {
    textArray: PropTypes.arrayOf(PropTypes.string).isRequired,
    baseVelocity: PropTypes.number,
    scrollY: PropTypes.object.isRequired,
};
