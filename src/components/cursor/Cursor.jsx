import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {motion, useMotionValue, useSpring} from "framer-motion";
import { useCursor } from "./CursorContext.jsx";

const Cursor = () => {
    const [isActive, setIsActive] = useState(false); // Cursor activation
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
    const [cursorColor, setCursorColor] = useState("#fafafa"); // Default cursor color
    const { isLinkHovered, isContentHovered, isInteractiveHovered, isClicked, leftViewport } = useCursor();
    const location = useLocation(); // Get the current route
    const colors = ["#ff5733", "#33c4ff", "#a633ff", "#ff33a1", "#33ff57", "#fc0834", "#4a21ff", "#ffef73"];

    const mouseX = useMotionValue(window.innerWidth / 2);
    const mouseY = useMotionValue(window.innerHeight / 2);

    // Apply smoothing/spring to the motion values
    const springX = useSpring(mouseX, { stiffness: 400, damping: 35, mass: 0.5 });
    const springY = useSpring(mouseY, { stiffness: 400, damping: 35, mass: 0.5 });

    useEffect(() => {
        // Activate the cursor after a delay (ms)
        let timeout;
        // Only set the timeout if on the landing page
        if (location.pathname === "/") {
            timeout = setTimeout(() => {
                setIsActive(true);
            }, 2200);
        } else {
            setIsActive(true); // Activate immediately on other pages
        }

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 8); // Offset to center the cursor
            mouseY.set(e.clientY - 8);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Randomize cursor color
    useEffect(() => {
        if (isLinkHovered || isContentHovered || isInteractiveHovered || isClicked) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setCursorColor(randomColor);
        }
    }, [isLinkHovered, isContentHovered, isInteractiveHovered, isClicked]);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const cursorVariants = {
        initial: { scale: 1, opacity: 0 },
        default: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: "easeIn" }, },
        linkHover: { scale: 2.5, opacity: 1, backgroundColor: cursorColor, transition: { duration: 0.1, ease: "easeIn" }, },
        contentHover: {
            scale: isSmallScreen ? 2.0 : 3.0,
            opacity: 1,
            width: isSmallScreen ? 30 : 50,
            height: isSmallScreen ? 20 : 30,
            backgroundColor: cursorColor,
            transition: { duration: 0.2, ease: "easeOut" },
        },
        interactiveHover: {
            scale: isSmallScreen ? 3.0 : 6.0,
            opacity: 1,
            borderRadius: "50%",
            backgroundColor: cursorColor,
            transition: { duration: 0.2, ease: "easeIn" },
        },
        click: { scale: 0.8, opacity: 1, backgroundColor: cursorColor, },
        leftViewport: { scale: 1, opacity: 0, transition: { duration: 0.2, ease: "easeOut" }, },
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
            className={`fixed top-0 left-0 flex items-center justify-center z-30 w-5 h-5
                bg-customWhite backdrop-blur-xs mix-blend-difference pointer-events-none`}
            variants={cursorVariants}
            initial="initial"
            animate={getCursorVariant()}
            style={{ x: springX, y: springY }}
        >
            {getCursorVariant() === "interactiveHover" && (
                <motion.span
                    className="mix-blend-difference text-[3px] font-raleway uppercase tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    Interact
                </motion.span>
            )}
        </motion.div>
    );
};

export default Cursor;
