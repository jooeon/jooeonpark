import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import { ReactLenis } from 'lenis/react'
import Index from "./Index.jsx";
import Art from "./Art.jsx";
import Tech from "./Tech.jsx";
import Steps from "./projects/Steps.jsx";
import About from "./About.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Cursor from "./components/Cursor.jsx";
import { CursorProvider } from "./components/CursorContext.jsx";

// animations for entering and exiting each page
const navVariants = {
    enter: {
        opacity: 1,
        transition: { delay: 0, duration: 0.6, ease: "easeIn" },
    },
    exit: {
        opacity: 0,
        transition: { delay: 0, duration: 1, ease: "easeIn" },
    },
};

const AnimatedRoutes = () => {
    const location = useLocation(); // Get current location from Router

    return (
        <AnimatePresence mode="wait">
            <ScrollToTop>
                <motion.div
                    key={location.pathname}
                    variants={navVariants}
                    initial="exit"
                    animate="enter"
                    exit="exit"
                >
                    <Routes location={location}>
                        <Route path="/" element={<Index />} />
                        <Route path="/Art" element={<Art />} />
                        <Route path="/steps" element={<Steps />} />
                        <Route path="/tech" element={<Tech />} />
                        <Route path="/info" element={<About />} />
                    </Routes>
                </motion.div>
            </ScrollToTop>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <ReactLenis root>
            <Router>
                <CursorProvider>
                    <AnimatedRoutes />
                    {!isMobile && <Cursor />}
                </CursorProvider>
            </Router>
        </ReactLenis>
    );
};

export default App;
