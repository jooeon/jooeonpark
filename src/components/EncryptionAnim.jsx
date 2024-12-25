import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const EncryptionText = ({ text, duration = 2, speed = 10 }) => {
    const [encryptionText, setEncryptionText] = useState(Array(text.length).fill(""));

    useEffect(() => {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const intervalDuration = 1000 / speed;

        text.split("").forEach((char, index) => {
            const startDelay = index * (duration / text.length) * 1000; // Stagger letters

            setTimeout(() => {
                let elapsed = 0;
                const interval = setInterval(() => {
                    if (elapsed >= duration * 1000) {
                        clearInterval(interval); // Stop scrambling when duration is over
                        setEncryptionText((prev) =>
                            prev.map((c, i) => (i === index ? char : c))
                        );
                    } else {
                        setEncryptionText((prev) =>
                            prev.map((c, i) =>
                                i === index ? letters[Math.floor(Math.random() * letters.length)] : c
                            )
                        );
                        elapsed += intervalDuration;
                    }
                }, intervalDuration);
            }, startDelay);
        });
    }, [text, duration, speed]);

    return (
        <div className="flex">
            {encryptionText.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                >
                    {char}
                </motion.span>
            ))}
        </div>
    );
};

// Add PropTypes validation
EncryptionText.propTypes = {
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
    speed: PropTypes.number,
};

export default EncryptionText;
