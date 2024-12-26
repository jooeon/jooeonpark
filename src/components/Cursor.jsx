import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useCursor } from "./CursorContext";

const Cursor = () => {
    const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const [isActive, setIsActive] = useState(false); // Cursor activation
    const [isLoaded, setIsLoaded] = useState(false); // Track page load state
    const { isLinkHovered, isContentHovered, isClicked, leftViewport } = useCursor();
    const location = useLocation(); // Get the current route

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
            // console.log("y: " + e.clientY + "| x: " + e.clientX);
        };

        // Wait for all resources to load
        const handleLoad = () => {
            setIsLoaded(true); // Activate cursor after page load
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("load", handleLoad);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    // repetitive code currently because the mouse move transitions need to be consistent regardless of the mouse events
    const cursorVariants = {
        initial: ({ x, y }) => ({
            scale: 1,
            opacity: 0,
            x: x - 8,
            y: y - 8,
        }),
        default: ({ x, y }) => ({
            scale: 1,
            opacity: 1,
            x: x - 8, // Center the cursor
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
        linkHover: ({ x, y }) => ({
            scale: 2.5,
            opacity: 1,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
        contentHover: ({ x, y }) => ({
            scale: 6.0,
            opacity: 1,
            width: 50,
            height: 30,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
        click: ({ x, y }) => ({
            scale: 1.5,
            opacity: 1,
            x: x - 8,
            y: y - 8,
            transition: { type: "spring", stiffness: 250, mass: 0.1 },
        }),
        leftViewport: ({ x, y }) => ({
            scale: 1,
            opacity: 0,
            x: x - 8,
            y: y - 8,
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

    if (!isActive || !isLoaded) return null; // Hide cursor initially

    return (
        <motion.div
            className={`fixed top-0 left-0 z-50 w-5 h-5 bg-customWhite mix-blend-difference pointer-events-none`}
            variants={cursorVariants}
            initial="initial"
            animate={getCursorVariant()}
            custom={position} // Pass position to the variants
        />
    );
};

export default Cursor;
