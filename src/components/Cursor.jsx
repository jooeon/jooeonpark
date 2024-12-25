import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { isLinkHovered, isClicked, leftViewport } = useCursor();

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            // console.log("y: " + e.clientY + "| x: " + e.clientX);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // repetitive code currently because the mouse move transitions need to be consistent regardless of the mouse events
    const cursorVariants = {
        default: ({ x, y }) => ({
            scale: 1,
            x: x - 8, // Center the cursor
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
        hover: ({ x, y }) => ({
            scale: 2.5,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1, duration: 0.15, ease: "easeIn" },
        }),
        click: ({ x, y }) => ({
            scale: 1.5,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1, duration: 0.05, ease: "easeIn" },
        }),
        leftViewport: ({ x, y }) => ({
            scale: 1,
            x: x - 8,
            y: y - 8,
            opacity: 0,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
    };

    const getCursorVariant = () => {
        if (isLinkHovered) return "hover";
        if (isClicked) return "click";
        if (leftViewport) return "leftViewport";
        return "default";
    };

    return (
        <motion.div
            className={`fixed top-0 left-0 z-50 w-5 h-5 bg-customWhite mix-blend-difference pointer-events-none`}
            variants={cursorVariants}
            animate={getCursorVariant()}
            custom={position} // Pass position to the variants
        />
    );
};

export default Cursor;
