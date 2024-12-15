import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import EntryAnim from "./components/EntryAnim.jsx";
import { motion } from "framer-motion";

const Index = () => {

    return (
        <>
            <Header/>
            <main>
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full bg-customBlack text-customWhite z-20"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.4,
                        delay: 2.85,
                        ease: "linear"
                    }}
                >
                    <EntryAnim />
                </motion.div>
                {/* Introduction text */}
                <section className="flex items-center justify-center min-h-30vh m-5">
                    <motion.div
                        className="text-4xl text-center w-11/12 md:w-2/4"
                        initial={{y: 20, filter: 'blur(3px)'}}
                        animate={{y: 0, filter: 'blur(0px)'}}
                        transition={{
                            duration: 0.5,
                            delay: 3,
                            ease: "linear"
                        }}
                    >
                        <p className="py-24 md:py-40 text-35px text-clip overflow-hidden">
                            Joo Eon Park is an artist, designer, and engineer in the interdisciplinary world of digital media, where art and design meet technology.
                        </p>
                    </motion.div>
                </section>
                <section className="flex justify-center h-screen w-full p-5">
                    <motion.div
                        className="w-1/2 bg-customWhite m-5"
                        initial={{y: 250, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 1.2,
                            delay: 3,
                            ease: [0.42, 0, 0.58, 1]    // custom easeInOut
                        }}
                    >
                    </motion.div>
                    <motion.div
                        className="w-1/2 bg-customWhite m-5"
                        initial={{y: 250, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 1.2,
                            delay: 3.3,
                            ease: [0.42, 0, 0.58, 1]    // custom easeInOut
                        }}
                    >
                    </motion.div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Index;
