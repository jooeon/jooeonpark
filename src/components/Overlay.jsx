import{ useEffect } from "react";
import { motion } from "motion/react";
import PropTypes from "prop-types";

const Overlay = ({
                     images,
                     currentIndex,
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
            className="fixed inset-0 bg-black bg-opacity-75 flex md:gap-5 lg:gap-7 3xl:gap-14 4xl:gap-20 items-center justify-center z-30"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeOverlay} // Close when clicking on the backdrop
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
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >

                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    className="max-w-[80vw] max-h-[90vh]"
                    key={currentIndex} // Key to trigger animation on change
                />

                {/* Caption */}
                {/*<div className="text-right pt-1">*/}
                {/*  <p className="">{currentIndex + 1}/{images.length}</p>*/}
                {/*</div>*/}

            </motion.div>
        </motion.div>
    );
};

// Define propTypes
Overlay.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of image URLs
    currentIndex: PropTypes.number.isRequired, // Current image index
    closeOverlay: PropTypes.func.isRequired, // Function to close the overlay
};

export default Overlay;
