import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PropTypes from "prop-types";

// Plays encryption animation on a string, eventually landing on the input string
// Parameters: input text, delay in seconds for animation start, duration of animation, speed at which the random letters shuffle
const EncryptionText = ({ text, delay = 0, duration = 2, speed = 10 }) => {
    const [encryptionText, setEncryptionText] = useState(Array(text.length).fill(""));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true }); // Trigger only once when in view

    useEffect(() => {
        if (!isInView) return; // Do nothing if not in view

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const intervalDuration = 1000 / speed;
        const timeouts = []; // To keep track of all timeouts and intervals for cleanup

        text.split("").forEach((char, index) => {
            const startDelay = delay * 1000 + index * (duration / text.length) * 1000; // Stagger letters with initial delay

            const timeoutId = setTimeout(() => {
                let elapsed = 0;
                const interval = setInterval(() => {
                    if (elapsed >= duration * 1000) {
                        clearInterval(interval);
                        setEncryptionText((prev) =>
                            prev.map((c, i) => (i === index ? char : c))
                        );
                    } else {
                        setEncryptionText((prev) =>
                            prev.map((c, i) =>
                                i === index
                                    ? letters[Math.floor(Math.random() * letters.length)]
                                    : c
                            )
                        );
                        elapsed += intervalDuration;
                    }
                }, intervalDuration);
                timeouts.push(interval);
            }, startDelay);

            timeouts.push(timeoutId);
        });

        // Cleanup function to clear all timeouts and intervals if component unmounts
        return () => {
            timeouts.forEach((t) => clearTimeout(t));
        };
    }, [isInView, text, delay, duration, speed]);

    return (
        <motion.div
            ref={ref}
            className="flex"
        >
            {encryptionText.map((char, index) => (
                <motion.span
                    style={char === " " ? { width: "0.5rem" } : {}}
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: index * 0.05 }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

// PropTypes validation
EncryptionText.propTypes = {
    text: PropTypes.string.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    speed: PropTypes.number,
};

export default EncryptionText;
