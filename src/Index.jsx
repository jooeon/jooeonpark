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
                    className="fixed top-0 pointer-events-none h-full w-full
                        bg-customWhite bg-customBlack dark:bg-customBlack dark:text-customWhite z-20"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.4,
                        delay: 1.8,
                        ease: "linear"
                    }}
                >
                    <EntryAnim />
                </motion.div>
                <section className="flex justify-center h-screen w-full p-5">
                    <motion.div
                        className="w-1/2 bg-customBlack dark:bg-customWhite m-5"
                        initial={{y: 250, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 0.8,
                            delay: 1.8,
                            ease: [0.42, 0, 0.58, 1]    // custom easeInOut
                        }}
                    >
                    </motion.div>
                    <motion.div
                        className="w-1/2 bg-customBlack dark:bg-customWhite m-5"
                        initial={{y: 250, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 0.8,
                            delay: 2.1,
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
