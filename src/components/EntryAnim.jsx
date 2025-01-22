import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Overlay animation that plays when loading the landing page (/)
const AnimatedText = () => {
    const controls = useAnimation();

    useEffect(() => {
        async function sequence() {
            // Start the initial animation: fade in with blur
            await controls.start('visible');

            // Delay before starting the abbreviation
            await new Promise((resolve) => setTimeout(resolve, 850));

            // Start the abbreviation animation
            await controls.start('abbreviate');

        }

        sequence();
    }, [controls]);

    // Math for shifting letters
    // Width of full text: 256px
    // Amount of space added on: 107.12px
    // Shift "J." and "PARK" each by half of space gained: 53.56 px

    // Variants for "J"
    const jVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
        abbreviate: {
            opacity: 1,
            x: -53.56,
            transition: { duration: 0.6 },
        },
    };

    // Variants "OO"
    const ooVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
        abbreviate: {
            opacity: 1,
            x: -53.56,
            transition: { duration: 0.6 },
        },
    };

    // Variants for "E"
    const eVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
        abbreviate: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    // Variants for "ON"
    const onVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
        abbreviate: {
            opacity: 1,
            transition: { duration: 0.6 },
        },
    };

    // Variants for "PARK"
    const parkVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
        abbreviate: {
            opacity: 1,
            x: 53.56,
            transition: { duration: 0.6 },
        },
    };

    const fadeInVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.5 },
        },
    };

    const fadeOutVariants = {
        abbreviate: {
            opacity: 0,
            transition: { duration: 0.4 },
            ease: 'easeOut'
        },
    };

    return (
        <motion.p
            id="animated-text"
            className="fixed w-64 top-1/2 left-1/2 text-center
                transform -translate-x-1/2 -translate-y-1/2 text-35px z-30"
            initial="hidden"
            animate={controls}
        >

            <motion.span className="inline-block" variants={jVariants}>
                J
            </motion.span>

            {/* "OO" Segment */}
            <motion.span className="inline-block absolute" variants={ooVariants}>
                OO
            </motion.span>

            <motion.span variants={fadeInVariants}>
                <motion.span variants={fadeOutVariants}>
                    .
                </motion.span>
            </motion.span>

            {/* spacing */}
            <span className="inline-block">{' '}</span>

            <motion.span className="inline-block" variants={eVariants}>
                E
            </motion.span>

            {/* "ON" Segment */}
            <motion.span className="inline-block absolute" variants={onVariants}>
                ON
            </motion.span>

            <motion.span variants={fadeInVariants}>
                <motion.span variants={fadeOutVariants}>
                    .
                </motion.span>
            </motion.span>

            {/* spacing */}
            <span className="inline-block">{' '}</span>

            {/* " PARK" */}
            <motion.span className="inline-block" variants={parkVariants}>
                PARK
            </motion.span>
        </motion.p>
    );
};

export default AnimatedText;
