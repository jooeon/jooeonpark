import { motion } from "framer-motion"
import ThemeToggle from "./ThemeToggle.jsx";

const Footer = () => {
  return (
    <footer className="z-30">
        <motion.div
            className="flex items-center justify-between w-full p-6 md:px-7 md:py-4 text-xs md:text-base uppercase"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "linear"
            }}
        >
            <p>&copy; MMXXV. Joo Eon Park</p>
            <div className="flex items-center"><p className="p-2 font-azeret">-----></p><ThemeToggle /></div>
        </motion.div>
    </footer>
  );
};

export default Footer;
