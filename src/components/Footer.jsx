import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="footer mt-10 uppercase">
        <div className="grid">
            {/* TODO: add contact, links, etc, maybe a fancy design/text */}
            <div></div>
        </div>
        <motion.div
            className="flex justify-between px-5 py-4 md:px-6 md:py-5 text-xs md:text-base"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "linear"
            }}
        >
            <p>&copy; MMXXV. Joo Eon Park</p>
            <p>All rights reserved</p>
        </motion.div>
    </footer>
  );
};

export default Footer;
