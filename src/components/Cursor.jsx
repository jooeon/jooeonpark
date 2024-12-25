import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { isLinkHovered, isContentHovered, isClicked, leftViewport } = useCursor();

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
        linkHover: ({ x, y }) => ({
            scale: 2.5,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1},
        }),
        contentHover: ({ x, y }) => ({
            scale: 6.0,
            width: 50,
            height: 30,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1},
        }),
        click: ({ x, y }) => ({
            scale: 1.5,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1},
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
        if (isLinkHovered) return "linkHover";
        if (isContentHovered) return "contentHover";
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
