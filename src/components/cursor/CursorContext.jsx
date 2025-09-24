import { createContext, useContext, useState, useEffect, useRef } from "react"
import { useLocation } from "react-router-dom" // Add if using React Router
import PropTypes from "prop-types"

// Use Context API to manage the isHovered state globally
const CursorContext = createContext()

export const CursorProvider = ({ children }) => {
    const [isLinkHovered, setIsLinkHovered] = useState(false)
    const [isContentHovered, setIsContentHovered] = useState(false)
    const [isInteractiveHovered, setIsInteractiveHovered] = useState(false)
    const [isShaderHovered, setIsShaderHovered] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [leftViewport, setLeftViewport] = useState(false)
    const [isAlbumHovered, setIsAlbumHovered] = useState(false)
    const [currentAlbumArt, setCurrentAlbumArt] = useState("")

    // Add location hook if using React Router
    const location = useLocation()

    // Use ref to track navigation state without causing re-renders
    const isNavigatingRef = useRef(false)

    // Reset all cursor states function
    const resetAllCursorStates = () => {
        setIsLinkHovered(false)
        setIsContentHovered(false)
        setIsInteractiveHovered(false)
        setIsShaderHovered(false)
        setIsAlbumHovered(false)
        setCurrentAlbumArt("")
    }

    // Reset cursor states on route change and block mouse events during transition
    useEffect(() => {
        isNavigatingRef.current = true
        resetAllCursorStates()

        // Continuously reset during transition period
        const resetInterval = setInterval(() => {
            resetAllCursorStates()
        }, 50)

        // Stop blocking after transition completes
        const navigationTimer = setTimeout(() => {
            isNavigatingRef.current = false
            clearInterval(resetInterval)
        }, 600) // Match to navigation transition duration (see App.jsx)

        return () => {
            clearTimeout(navigationTimer)
            clearInterval(resetInterval)
        }
    }, [location.pathname])

    const handleAlbumHover = (albumArt) => {
        setIsAlbumHovered(true)
        setCurrentAlbumArt(albumArt)
    }

    const handleAlbumLeave = () => {
        setIsAlbumHovered(false)
        setCurrentAlbumArt("")
    }

    useEffect(() => {
        // Hover event on specific tags
        const handleMouseEnter = (e) => {
            if (
                e.target.closest(".title-text") ||
                e.target.closest(".parallax-text") ||
                e.target.closest("img") ||
                e.target.closest("video")
            ) {
                setIsContentHovered(true)
            } else if (
                e.target.closest("a") ||
                e.target.closest("button") ||
                e.target.closest("input") ||
                e.target.closest(".interact-shader")
            ) {
                setIsLinkHovered(true)
            } else if (e.target.closest("#ascii-shape")) {
                setIsInteractiveHovered(true)
            } else if (e.target.closest(".hover-shader")) {
                setIsShaderHovered(true);
            }
        }

        // Mouse leaves the target elements
        const handleMouseLeave = () => {
            setIsLinkHovered(false)
            setIsContentHovered(false)
            setIsInteractiveHovered(false)
            setIsShaderHovered(false)
        }

        // Mouse click event
        const handleClick = () => {
            setIsClicked(true)
            setTimeout(() => setIsClicked(false), 200) // Reset after 200ms
        }

        const handleMouseLeaveViewport = (e) => {
            // Check if the mouse left the viewport on all sides
            if (
                e.clientY <= 0 || // Top
                e.clientY >= window.innerHeight || // Bottom
                e.clientX <= 0 || // Left
                e.clientX >= window.innerWidth // Right
            ) {
                setLeftViewport(true)
                // Reset cursor states when leaving viewport
                resetAllCursorStates()
            }
        }

        // continues to call when mouse is within the viewport, since mousemove event is used below
        const handleMouseEnterViewport = () => {
            setLeftViewport(false)
        }

        // Handle page visibility changes (tab switching, minimizing)
        const handleVisibilityChange = () => {
            if (document.hidden) {
                resetAllCursorStates()
            }
        }

        // Handle navigation events (for non-React Router navigation)
        const handleBeforeUnload = () => {
            resetAllCursorStates()
        }

        const handlePopState = () => {
            resetAllCursorStates()
        }

        document.addEventListener("mouseover", handleMouseEnter)
        document.addEventListener("mouseout", handleMouseLeave)
        window.addEventListener("mousedown", handleClick)
        document.addEventListener("mouseout", handleMouseLeaveViewport)
        window.addEventListener("mousemove", handleMouseEnterViewport)
        document.addEventListener("visibilitychange", handleVisibilityChange)
        window.addEventListener("beforeunload", handleBeforeUnload)
        window.addEventListener("popstate", handlePopState)

        return () => {
            document.removeEventListener("mouseover", handleMouseEnter)
            document.removeEventListener("mouseout", handleMouseLeave)
            window.removeEventListener("mousedown", handleClick)
            document.removeEventListener("mouseout", handleMouseLeaveViewport)
            window.removeEventListener("mousemove", handleMouseEnterViewport)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            window.removeEventListener("beforeunload", handleBeforeUnload)
            window.removeEventListener("popstate", handlePopState)

            // Final cleanup - reset all states when provider unmounts
            resetAllCursorStates()
        }
    }, [])

    const value = {
        isLinkHovered,
        isContentHovered,
        isInteractiveHovered,
        isShaderHovered,
        isClicked,
        leftViewport,
        isAlbumHovered,
        currentAlbumArt,
        handleAlbumHover,
        handleAlbumLeave,
        resetAllCursorStates, // Expose for manual resets
    }

    return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
}

CursorProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useCursor = () => useContext(CursorContext)