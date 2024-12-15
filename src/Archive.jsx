// Archive.jsx
import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Overlay from "./components/Overlay";
import { items } from "./Data.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Archive = () => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCaption, setCurrentCaption] = useState("");

    const openOverlay = (images, caption) => {
        setCurrentImages(images);
        setCurrentIndex(0);
        setCurrentCaption(caption);
        setOverlayVisible(true);
    };

    const closeOverlay = () => setOverlayVisible(false);

    const prevImage = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + currentImages.length) % currentImages.length
        );
    };

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % currentImages.length);
    };

    // Prevent background scrolling when overlay is open
    // useEffect(() => {
    //     if (overlayVisible) {
    //         document.body.style.overflow = "hidden";
    //     } else {
    //         document.body.style.overflow = "auto";
    //     }
    // }, [overlayVisible]);

    return (
        <>
            <Header />
            <main className="flex justify-center m-5">
                <motion.section
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.5,
                        delay: 0.2,
                        ease: "linear"
                    }}
                >
                    {items.map((item) => (
                        <div
                            className="relative group cursor-pointer"
                            key={item.id} // Ensure each item has a unique id
                            onClick={() => openOverlay(item.images, item.caption)}
                            tabIndex={0}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") openOverlay(item.images, item.caption);
                            }}
                            aria-label={`Open portfolio item: ${item.caption}`}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.alt}
                                loading="lazy" // Adds lazy loading for performance
                                className="w-full aspect-square object-cover transition duration-300 ease-in-out hover:brightness-50"
                            />
                            <div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl text-center opacity-0 transition-opacity duration-300 ease-in-out pointer-events-none group-hover:opacity-100"
                                dangerouslySetInnerHTML={{ __html: item.caption }}
                            ></div>
                        </div>
                    ))}
                </motion.section>
            </main>

            {/* AnimatePresence wraps the conditional rendering of the Overlay */}
            <AnimatePresence>
                {overlayVisible && (
                    <Overlay
                        images={currentImages}
                        caption={currentCaption}
                        currentIndex={currentIndex}
                        prevImage={prevImage}
                        nextImage={nextImage}
                        closeOverlay={closeOverlay}
                        key="overlay" // Key is necessary for AnimatePresence
                    />
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
};

export default Archive;
