import { useState, useEffect, Fragment } from 'react';
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ParallaxGallery = ({ galleryData }) => {
    const [scrollY, setScrollY] = useState(0); // Track the scroll position

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // Update scroll position
        };

        // Add event listener for scroll
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll); // Clean up the event listener
        };
    }, []);

    return (
        <div className="flex flex-col xl:grid xl:grid-cols-2 xl:gap-x-0 xl:gap-y-32">
            {galleryData.map((artwork, index) => {
                // Different scroll speeds for different images
                const speed = artwork.scrollSpeed === "slow"
                    ? 0
                    : artwork.scrollSpeed === "normal"
                        ? -0.1
                        : artwork.scrollSpeed === "fast"
                            ? -0.2
                            : artwork.scrollSpeed === "faster"
                                ? -0.3
                                : -0.45
                const animDelay = index % 3 === 0 ? 1.0 : index % 3 === 1 ? 1.2 : 1.4;
                // const zIndex = index % 3 === 0 ? "-z-10" : index % 3 === 1 ? "-z-10" : "z-10";
                const vAlignment = artwork.verticalAlign === "top"
                    ? "items-start"
                    : artwork.verticalAlign === "bottom"
                        ? "items-end"
                        : "items-center";
                const hAlignment = artwork.horizontalAlign === "left"
                    ? "justify-start"
                    : artwork.horizontalAlign === "right"
                        ? "justify-end"
                        : "justify-center";
                // Wrapper to conditionally render links only if the data exists
                const to = artwork.link;
                const Wrapper = to ? Link : Fragment;
                const wrapperProps = to ? { to } : {};

                return (
                    <div key={index} className={`flex xl:h-[70vh] ${hAlignment} ${vAlignment}`}>
                        <motion.div
                            className="flex flex-col w-full max-w-[30vw] object-cover object-top"
                            style={{
                                transform: `translateY(${scrollY * speed}px)`, // Apply different parallax scroll speeds
                            }}
                        >
                            <Wrapper {...wrapperProps}>
                                <div className="overflow-hidden">
                                    <motion.img
                                        src={artwork.thumbnail}
                                        alt={`Image of ${artwork.title}`}
                                        className="w-full h-auto object-cover"
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={{ scale: 1.02, filter: "grayscale(0.5) sepia(0.75) brightness(0.75)", }}
                                        transition={{
                                            y: { duration: 0.5, delay: animDelay, ease: "easeOut" },
                                            opacity: { duration: 0.5, delay: animDelay, ease: "easeOut" },
                                            scale: { duration: 1.5, ease: [0.075, 0.82, 0.165, 1] }
                                        }}
                                    />
                                </div>
                            </Wrapper>
                            <motion.div
                                className={`flex justify-between text-customGrayLight mt-0.5 md:mt-1 ${artwork.horizontalAlign === "left" && "pl-0.5 md:pl-1"}
                    text-4xs sm:text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: animDelay+0.4,
                                    ease: "linear",
                                }}
                            >
                                <p>{artwork.title}</p>
                                <p className="text-customGray">{artwork.year}</p>
                            </motion.div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
};

ParallaxGallery.propTypes = {
    galleryData: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ParallaxGallery;
