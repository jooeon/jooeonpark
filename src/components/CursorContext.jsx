import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Use Context API to manage the isHovered state globally
const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const [isLinkHovered, setIsLinkHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        // Hover event on links (<a> tags)
        const handleMouseEnter = (e) => {
            if (e.target.closest("a")) {
                setIsLinkHovered(true);
            }
        };

        const handleMouseLeave = () => {
            setIsLinkHovered(false);
        };

        // Mouse click event
        const handleClick = () => {
            setIsClicked(true);
            setTimeout(() => setIsClicked(false), 200); // Reset after 200ms
        };

        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);
        window.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
            window.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const value = {
        isLinkHovered,
        isClicked,
        setIsLinkHovered,
    };

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

CursorProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useCursor = () => useContext(CursorContext);
