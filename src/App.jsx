import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import {ReactLenis} from 'lenis/react'
import Index from "./pages/Index.jsx";
import Art from "./pages/Art.jsx";
import Tech from "./pages/Tech.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import Cursor from "./components/cursor/Cursor.jsx";
import { CursorProvider } from "./components/cursor/CursorContext.jsx";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import Page404 from "./pages/Page404.jsx";

// animations for entering and exiting each page
const navVariants = {
    enter: {
        opacity: 1,
        transition: { delay: 0.6, duration: 0.3, ease: "easeIn" },
    },
    exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0.3, ease: "easeOut" },
    },
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                <Route path="/art" element={<PageWrapper><Art /></PageWrapper>} />
                <Route path="/:type/:id" element={<PageWrapper><Project /></PageWrapper>} />
                <Route path="/tech" element={<PageWrapper><Tech /></PageWrapper>} />
                <Route path="/info" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/404" element={<PageWrapper><Page404 /></PageWrapper>} />
                <Route path="/404" element={<Page404 />} />
                {/* catch‑all: redirect to /404 */}
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

function PageWrapper({ children }) {
    return (
        <motion.div
            variants={navVariants}
            initial="exit"
            animate="enter"
            exit="exit"
        >
            {children}
        </motion.div>
    );
}

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

const App = () => {

    // On component mount, set dark theme as default
    useEffect(() => {
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            // If saved preference is light, apply light theme
            document.documentElement.classList.remove('dark');
        } else {
            // Default to dark theme
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <ReactLenis
            root
            options={{
                lerp:         0.075,    // default 0.1, smaller=slower catch-up
                wheelMultiplier:  0.75, // default 1
            }}
        >
            <BrowserRouter>
                <CursorProvider>
                    <AnimatedRoutes />
                    {!isMobile && <Cursor />}
                </CursorProvider>
            </BrowserRouter>
        </ReactLenis>
    );
};

export default App;
