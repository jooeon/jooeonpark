import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Index from "./Index.jsx";
import Art from "./Art.jsx";
import Steps from "./projects/Steps.jsx";
// import Archive from "./Archive.jsx";
import About from "./About.jsx";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

// animations for entering and exiting each page
const navVariants = {
    enter: {
        opacity: 1,
        transition: { delay: 0, duration: 0.3, ease: "easeIn" },
    },
    exit: {
        opacity: 0,
        transition: { delay: 0., duration: 0.3, ease: "easeIn" },
    },
};

const AnimatedRoutes = () => {
    const location = useLocation(); // Get current location from Router

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <motion.div
                            variants={navVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            <Index />
                        </motion.div>
                    }
                />
                <Route
                    path="/Art"
                    element={
                        <motion.div
                            variants={navVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            <Art />
                        </motion.div>
                    }
                />
                <Route
                    path="/steps"
                    element={
                        <motion.div
                            variants={navVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            <Steps />
                        </motion.div>
                    }
                />
                {/* <Route path="/archive" element={<Archive />} /> */}
                <Route
                    path="/about"
                    element={
                        <motion.div
                            variants={navVariants}
                            initial="exit"
                            animate="enter"
                            exit="exit"
                        >
                            <About />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <AnimatedRoutes />
        </Router>
    );
};

export default App;
