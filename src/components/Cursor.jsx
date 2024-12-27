import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight * 3 / 4 });
    const [isActive, setIsActive] = useState(false); // Cursor activation
    const [cursorColor, setCursorColor] = useState("#ffffff"); // Default cursor color
    const { isLinkHovered, isContentHovered, isInteractiveHovered, isClicked, leftViewport } = useCursor();
    const location = useLocation(); // Get the current route

    const colors = ["#ff5733", "#33c4ff", "#a633ff", "#ff33a1", "#33ff57", "#fc0834", "#4a21ff", "#ffef73"]; // Preset colors

    useEffect(() => {
        // Activate the cursor after a delay (ms)
        // Currently there is a bug where cursor on initial load stutters
        // Specifically when there are other heavy animations (e.g. the ascii animation)
        // setting a long enough timeout seems to resolve this issue
        let timeout;
        // Only set the timeout if on the landing page
        if (location.pathname === "/") {
            timeout = setTimeout(() => {
                setIsActive(true);
            }, 4500); // Delay for 4.5 seconds
        } else {
            setIsActive(true); // Activate immediately on other pages
        }

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    useEffect(() => {
        if (isLinkHovered || isContentHovered || isInteractiveHovered) {
            // Randomize cursor color
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setCursorColor(randomColor);
        }
    }, [isLinkHovered, isContentHovered, isInteractiveHovered]);

    const isSmallScreen = window.innerWidth <= 768;

    const cursorVariants = {
        initial: ({ x, y }) => ({
            scale: 1,
            opacity: 0, // initial cursor fade in
            transition: { duration: 1.5, ease: "easeIn" },
            x: x - 8,   // subtract 8 to center actual cursor to custom cursor
            y: y - 8,
        }),
        default: ({ x, y }) => ({
            scale: 1,
            opacity: 1,
            x: x - 8,
            y: y - 8,
        }),
        linkHover: ({ x, y }) => ({
            scale: 2.5,
            opacity: 1,
            backgroundColor: cursorColor,
            x: x - 8,
            y: y - 8,
        }),
        contentHover: ({ x, y }) => {
            return {
                scale: isSmallScreen ? 4.0 : 6.0,
                opacity: 1,
                width: isSmallScreen ? 30 : 50,
                height: isSmallScreen ? 20 : 30,
                backgroundColor: cursorColor,
                x: x - 8,
                y: y - 8,
            };
        },
        interactiveHover: ({ x, y }) => ({
            scale: isSmallScreen ? 4.0 : 6.0,
            opacity: 1,
            borderRadius: "50%",
            backgroundColor: cursorColor,
            x: x - 8,
            y: y - 8,
        }),
        click: ({ x, y }) => ({
            scale: 1.5,
            opacity: 1,
            x: x - 8,
            y: y - 8,
        }),
        leftViewport: ({ x, y }) => ({
            scale: 1,
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" },
            x: x - 8,
            y: y - 8,
        }),
    };

    const getCursorVariant = () => {
        if (isLinkHovered) return "linkHover";
        if (isContentHovered) return "contentHover";
        if (isInteractiveHovered) return "interactiveHover";
        if (isClicked) return "click";
        if (leftViewport) return "leftViewport";
        return "default";
    };

    if (!isActive) return null; // Hide cursor initially

    return (
        <motion.div
            className={`fixed top-0 left-0 z-50 w-5 h-5 bg-customWhite mix-blend-difference pointer-events-none`}
            variants={cursorVariants}
            initial="initial"
            animate={getCursorVariant()}
            transition={{ type: "spring", stiffness: 275, mass: 0.1 }}
            custom={position} // Pass position to the variants
        />
    );
};

export default Cursor;
