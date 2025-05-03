import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedText = () => {
    const controls = useAnimation();

    useEffect(() => {
        async function sequence() {
            // Start the initial animation: fade in with blur
            await controls.start('visible');

            // Wait for 1 second before starting the abbreviation
            await new Promise((resolve) => setTimeout(resolve, 750));

            // Start the abbreviation animation
            await controls.start('abbreviate');
        }

        sequence();
    }, [controls]);

    // Math for shifting letters
    // Width of full text: 251.35px
    // Amount of space lost: 107.12px
    // Shift "J." and "PARK" each by half of space lost: 53.56 px

    // Variants for "J"
    const jVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8 },
        },
        abbreviate: {
            opacity: 1,
            x: 53.56,
            transition: { duration: 0.8 },
        },
    };

    // Variants for period after "J"
    const periodJVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0 },
        abbreviate: {
            opacity: 1,
            x: 53.56,
            transition: { duration: 0.8 },
        },
    };

    // Variants for "E"
    const eVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8 },
        },
        abbreviate: {
            opacity: 1,
            transition: { duration: 0.8 },
        },
    };

    // Variants for period after "E"
    const periodEVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 0 },
        abbreviate: {
            opacity: 1,
            transition: { duration: 0.8 },
        },
    };

    // Variants for "PARK"
    const parkVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8 },
        },
        abbreviate: {
            opacity: 1,
            x: -53.56,
            transition: { duration: 0.8 },
        },
    };

    const fadeInVariants = {
        hidden: { opacity: 0, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            transition: { duration: 0.8 },
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
        <motion.h1
            id="animated-text"
            className="fixed w-64 top-1/2 left-1/2 text-center
                transform -translate-x-1/2 -translate-y-1/2 text-35px font-bold z-30"
            initial="hidden"
            animate={controls}
        >

            <motion.span className="inline-block" variants={jVariants}>
                J
            </motion.span>
            <motion.span className="inline-block absolute" variants={periodJVariants}>
                .
            </motion.span>

            <motion.span variants={fadeInVariants}>
                {/* "OO" Segment */}
                <motion.span variants={fadeOutVariants}>
                    OO
                </motion.span>
            </motion.span>

            {/* spacing */}
            <span>{' '}</span>

            <motion.span className="inline-block" variants={eVariants}>
                E
            </motion.span>
            <motion.span className="inline-block absolute" variants={periodEVariants}>
                .
            </motion.span>

            <motion.span variants={fadeInVariants}>
                {/* "ON" Segment */}
                <motion.span variants={fadeOutVariants}>
                    ON
                </motion.span>
            </motion.span>

            {/* spacing */}
            <span>{' '}</span>

            {/* " PARK" */}
            <motion.span className="inline-block" variants={parkVariants}>
                PARK
            </motion.span>
        </motion.h1>
    );
};

export default AnimatedText;
