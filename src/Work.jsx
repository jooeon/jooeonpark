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
                <section className="flex flex-row flex-wrap justify-between gap-5 md:gap-52 h-min w-full md:w-9/12 mx-auto p-5">
                    {items.map((item) => (
                        <div
                            className="relative w-96 h-96"
                            key={item.id} // Ensure each item has a unique id
                            tabIndex={0}
                        >
                        {item.isVideo && (
                            <video
                                autoPlay
                                muted
                                loop
                                className="w-full"
                            >
                                <source src="src/videos/polychrome.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {!item.isVideo && (
                            <img
                                src={item.thumbnail}
                                alt={item.alt}
                                loading="lazy" // Adds lazy loading for performance
                                className="w-full aspect-square md:aspect-auto object-cover"
                            />
                        )}
                        </div>
                    ))}
                </section>
                {/*<section className="flex justify-center h-screen w-full p-5">*/}
                {/*    <motion.div*/}
                {/*        className="w-1/2 bg-customBlack dark:bg-customWhite m-5"*/}
                {/*        initial={{y: 250, opacity: 0}}*/}
                    {/*        animate={{y: 0, opacity: 1}}*/}
                    {/*        transition={{*/}
                    {/*            duration: 0.8,*/}
                    {/*            delay: 1.8,*/}
                    {/*            ease: [0.42, 0, 0.58, 1]    // custom easeInOut*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*    </motion.div>*/}
                    {/*    <motion.div*/}
                    {/*        className="w-1/2 bg-customBlack dark:bg-customWhite m-5"*/}
                    {/*        initial={{y: 250, opacity: 0}}*/}
                    {/*        animate={{y: 0, opacity: 1}}*/}
                    {/*        transition={{*/}
                    {/*            duration: 0.8,*/}
                    {/*            delay: 2.1,*/}
                    {/*            ease: [0.42, 0, 0.58, 1]    // custom easeInOut*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*    </motion.div>*/}
                    {/*</section>*/}
            </main>
            <Footer/>
        </>
);
};

export default Work;
