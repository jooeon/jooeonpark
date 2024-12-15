import{ useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes

const Overlay = ({
                     images,
                     caption,
                     currentIndex,
                     prevImage,
                     nextImage,
                     closeOverlay,
                 }) => {
    // Handle ESC key to close the overlay
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                closeOverlay();
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [closeOverlay]);

    // Framer Motion variants for the backdrop and content
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

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOverlay} // Close when clicking on the backdrop
            aria-modal="true"
            role="dialog"
        >
            <motion.div
                className="overflow-hidden relative top-1.5 max-w-90vw w-fit mx-4"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4 }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >

                {/* Image with Animation */}
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="max-w-90vw max-h-90vh"
                    key={currentIndex} // Key to trigger animation on change
                />

                {/* Caption */}
                <div className="p-2">
                    <h2
                        className="text-base"
                        dangerouslySetInnerHTML={{ __html: caption }}
                    ></h2>
                    {/* Add more details if needed */}
                </div>

                {/* Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <motion.button
                            onClick={prevImage}
                            className="fixed top-1/2 left-5 text-white p-2 text-5xl"
                            aria-label="Previous Image"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeIn"
                            }}
                        >
                            ❮
                        </motion.button>
                        <motion.button
                            onClick={nextImage}
                            className="fixed top-1/2 right-5 text-white p-2 text-5xl"
                            aria-label="Next Image"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                                ease: "easeIn"
                            }}
                        >
                            ❯
                        </motion.button>
                    </>
                )}
            </motion.div>
        </motion.div>
    );
};

// Define propTypes
Overlay.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of image URLs
    caption: PropTypes.string.isRequired, // Caption string
    currentIndex: PropTypes.number.isRequired, // Current image index
    prevImage: PropTypes.func.isRequired, // Function to go to previous image
    nextImage: PropTypes.func.isRequired, // Function to go to next image
    closeOverlay: PropTypes.func.isRequired, // Function to close the overlay
};

export default Overlay;
