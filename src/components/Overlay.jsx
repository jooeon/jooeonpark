import { useEffect } from "react";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const Overlay = ({ media, currentIndex, closeOverlay }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") closeOverlay();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeOverlay]);

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const contentVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
    };

    const current = media[currentIndex];

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex md:gap-5 lg:gap-7 3xl:gap-14 4xl:gap-20 items-center justify-center z-30"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOverlay}
            aria-modal="true"
            role="dialog"
        >
            <motion.div
                className="relative w-fit"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()}
            >
                {current.type === "video" ? (
                    <video
                        key={currentIndex}
                        src={current.src}
                        className="max-w-[80vw] max-h-[90vh]"
                        controls
                        autoPlay
                        muted={!current.hasAudio}
                        loop={!current.hasAudio}
                    />
                ) : (
                    <img
                        key={currentIndex}
                        src={current.src}
                        alt={`Image ${currentIndex + 1}`}
                        className="max-w-[80vw] max-h-[90vh]"
                    />
                )}
            </motion.div>
        </motion.div>
    );
};

Overlay.propTypes = {
    media: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            type: PropTypes.oneOf(["image", "video"]).isRequired,
            hasAudio: PropTypes.bool,
        })
    ).isRequired,
    currentIndex: PropTypes.number.isRequired,
    closeOverlay: PropTypes.func.isRequired,
};

export default Overlay;