import { motion } from "framer-motion"
import ThemeToggle from "../ThemeToggle.jsx";

const Footer = () => {
  return (
    <footer className="z-30">
        <motion.div
            className="flex items-center justify-between w-full p-3 md:p-5 xl:px-4 xl:py-6 3xl:px-7 3xl:py-8 4xl:px-10 4xl:py-10 7xl:px-14 7xl:py-16
                text-3xs sm:text-xs md:text-sm 4xl:text-2xl 6xl:text-4xl lowercase font-neueHaasGrotesk font-extrabold tracking-wider"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "linear"
            }}
        >
            <p className="flex gap-8 md:gap-10 xl:gap-16 3xl:gap-20 4xl:gap-24 6xl:gap-36">
                <span>&copy;{new Date().getFullYear()}</span>
                <span>Joo Eon Park</span>
            </p>
            <div className="flex items-center"><ThemeToggle /></div>
        </motion.div>
    </footer>
  );
};

export default Footer;
