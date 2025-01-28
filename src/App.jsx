import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { ReactLenis } from 'lenis/react'
import Index from "./Index.jsx";
import Art from "./Art.jsx";
import Tech from "./Tech.jsx";
import Project from "./projects/Project.jsx";
import About from "./About.jsx";
import Cursor from "./components/Cursor.jsx";
import { CursorProvider } from "./components/CursorContext.jsx";
import PropTypes from "prop-types";

// animations for entering and exiting each page
const navVariants = {
    enter: {
        opacity: 1,
        transition: { delay: 0.7, duration: 0.3, ease: "easeIn" },
    },
    exit: {
        opacity: 0,
        transition: { delay: 0, duration: 0.3, ease: "easeOut" },
    },
};

const AnimatedRoutes = () => {
    const location = useLocation(); // Get current location from Router

    return (
        <AnimatePresence mode="wait">
            {/*<ScrollToTop>*/}
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                    <Route path="/art" element={<PageWrapper><Art /></PageWrapper>} />
                    <Route path="/project/:id" element={<PageWrapper><Project /></PageWrapper>} />
                    <Route path="/tech" element={<PageWrapper><Tech /></PageWrapper>} />
                    <Route path="/info" element={<PageWrapper><About /></PageWrapper>} />
                </Routes>
            {/*</ScrollToTop>*/}
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
    return (
        <ReactLenis root>
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
