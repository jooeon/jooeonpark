import { motion } from "framer-motion";
import PropTypes from "prop-types";

export const maskVariants = {
    hidden:  { y: "100%" },
    visible: { y: "0%"   },
    exit:    { y: "100%" }
};

export function MaskText({
                             phrase,
                             duration = 2,
                             delay = 0.075,
                             animate = "visible",
                             initial = "hidden",
                         }) {
    return (
        <div className="overflow-hidden">
            <motion.p
                className="m-0"
                variants={maskVariants}
                initial={initial}
                animate={animate}
                transition={{
                    duration: duration,
                    ease: [0.25, 1, 0.5, 1], // easeOutQuart
                    delay: delay,
                }}
            >
                {phrase}
            </motion.p>
        </div>
    );
}

MaskText.propTypes = {
    phrase: PropTypes.string.isRequired,
    duration: PropTypes.number,
    delay: PropTypes.number,
    animate: PropTypes.string,
    initial: PropTypes.string
};

