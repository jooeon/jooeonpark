import { Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import EntryAnim from "./components/EntryAnim.jsx";
import { motion } from "framer-motion";
import {items} from "./Data.jsx";

const Work = () => {

    return (
        <>
            <Header/>
            <main>
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full
                        bg-customWhite text-customBlack dark:bg-customBlack dark:text-customWhite z-20"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.4,
                        delay: 1.8,
                        ease: "linear"
                    }}
                >
                    <EntryAnim/>
                </motion.div>
                <section className="flex flex-row flex-wrap justify-between gap-5 xl:gap-48
                    h-min w-full xl:w-11/12 mx-auto p-5 uppercase">
                    {items.map((item) => (
                        <motion.div
                            className="flex flex-col w-full h-full xl:w-2/5 xl:h-2/5"
                            key={item.id}
                            initial={{y: 150, opacity: 0}}
                            whileInView={{y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Top captions */}
                            <div className="flex justify-between">
                                {item.caption && (
                                    <>
                                        {/* Top-Left Caption */}
                                        {item.caption[0] && (
                                            <p className="text-customBlack">
                                                {item.caption[0]}
                                            </p>
                                        )}

                                        {/* Top-Right Caption */}
                                        {item.caption[1] && (
                                            <p className="text-customGray">
                                                {item.caption[1]}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                            {/* Video/image content */}
                            <Link to={item.link} className="cursor-pointer">
                                {item.isVideo && (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        className="w-full py-3"
                                    >
                                        <source src={item.thumbnail} type="video/mp4"/>
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                                {!item.isVideo && (
                                    <img
                                        src={item.thumbnail}
                                        alt={item.alt}
                                        loading="lazy" // Adds lazy loading for performance
                                        className="w-full aspect-square md:aspect-auto object-cover py-3"
                                    />
                                )}
                            </Link>
                            {/* Bottom captions */}
                            <div className="flex justify-between">
                            {item.caption && (
                                <>
                                    {/* Bottom-Left Caption */}
                                    {item.caption[2] && (
                                        <p className="text-customGray">
                                            {item.caption[2]}
                                        </p>
                                    )}

                                    {/* Bottom-Right Caption */}
                                    {item.caption[3] && (
                                        <p className="text-customBlack">
                                            {item.caption[3]}
                                        </p>
                                    )}
                                </>
                            )}
                            </div>
                        </motion.div>
                    ))}
                </section>
            </main>
            <Footer/>
        </>
);
};

export default Work;
