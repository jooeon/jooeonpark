import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = ({ content }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentItem = content[currentIndex];
    const isVideo = /\.(mp4|mov|webm)$/i.test(currentItem); // Check if file is a video
    const intervalDuration = isVideo ? 11000 : 5000; // 10 seconds for videos, 5 seconds for images

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % content.length);
        }, intervalDuration);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [content.length, intervalDuration]);

    if (content.length === 0) {
        return <div>No content provided.</div>;
    }

    return (
        <div>
            <AnimatePresence>
                {isVideo ? (
                    <motion.video
                        className="absolute aspect-video object-cover rounded-2xl"
                        key={currentItem}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        autoPlay
                        muted
                        loop
                    >
                        <source src={currentItem} type="video/mp4" />
                        Your browser does not support the video tag.
                    </motion.video>
                ) : (
                    <motion.img
                        className="absolute aspect-video object-cover rounded-2xl"
                        key={currentItem}
                        src={currentItem}
                        alt="Carousel Content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Props validation using PropTypes
Carousel.propTypes = {
    content: PropTypes.arrayOf(PropTypes.string).isRequired, // `content` must be an array of strings
};

export default Carousel;
