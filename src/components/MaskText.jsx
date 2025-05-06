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

    const wordArray = phrase.split(" ");

    return (
        <div className="flex flex-wrap gap-x-2 md:gap-x-5 xl:gap-x-8 4xl:gap-x-10">
        {wordArray.map((word, i) => (
            <div key={i} className="overflow-hidden w-fit">
                <motion.p
                    className="m-0"
                    variants={maskVariants}
                    initial={initial}
                    animate={animate}
                    transition={{
                        duration: duration,
                        ease: [0.25, 1, 0.5, 1], // easeOutQuart
                        delay: delay+=0.1,
                    }}
                >
                    {word}
                </motion.p>
            </div>
        ))}
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

