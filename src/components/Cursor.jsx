import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { isLinkHovered, isClicked } = useCursor();

    useEffect(() => {
        let animationFrameId;
        // Use requestAnimationFrame to track the mouse movements efficiently
        const handleMouseMove = (e) => {
            animationFrameId = requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // initialize and set variants based on cursor events
    const cursorVariants = {
        default: {
            scale: 1,
            transition: { type: "spring", bounce: 0.3, visualDuration: 0.1, }, // Cursor movement
        },
        hover: {
            scale: 1.8,
            transition: { duration: 0.15, ease: "easeIn" }, // Hover effect
        },
        click: {
            scale: 1.5,
            transition: { duration: 0.05, ease: "linear" }, // Click effect
        },
    };

    const getCursorVariant = () => {
        if (isLinkHovered) return "hover";
        if (isClicked) return "click";
        return "default";
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 z-50 w-5 h-5 bg-customWhite mix-blend-difference pointer-events-none`}
            style={{
                x: position.x - 8,
                y: position.y - 8,
            }}
            variants={cursorVariants}
            animate={getCursorVariant()}
        />
    );
};

export default Cursor;
