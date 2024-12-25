import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Use Context API to manage the isHovered state globally
const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [leftViewport, setLeftViewport] = useState(false);

    useEffect(() => {
        // Hover event on links (<a> tags)
        const handleMouseEnter = (e) => {
            if (e.target.closest("a") || e.target.closest("button")) {
                setIsLinkHovered(true);
            }
        };
        // Mouse leaves the target elements
        const handleMouseLeave = () => {
            setIsLinkHovered(false);
        };

        // Mouse click event
        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
        };

        const handleMouseLeaveViewport = (e) => {
            // Check if the mouse left the viewport on all sides
            if (
                e.clientY <= 0 || // Top
                e.clientY >= window.innerHeight || // Bottom
                e.clientX <= 0 || // Left
                e.clientX >= window.innerWidth // Right
            ) {
                setLeftViewport(true);
            }
        }

        // continues to call when mouse is within the viewport, since mousemove event is used below
        const handleMouseEnterViewport = () => {
            setLeftViewport(false);
        };

        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);
        window.addEventListener("mousedown", handleClick);
        document.addEventListener("mouseout", handleMouseLeaveViewport);
        window.addEventListener("mousemove", handleMouseEnterViewport);

        return () => {
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            window.removeEventListener("mousedown", handleClick);
            document.removeEventListener("mouseout", handleMouseLeaveViewport);
            window.removeEventListener("mousemove", handleMouseEnterViewport);
        };
    }, []);

    const value = {
        isLinkHovered,
        isClicked,
        leftViewport,
    };

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

CursorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCursor = () => useContext(CursorContext);
