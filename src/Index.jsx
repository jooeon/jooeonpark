import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";

const Index = () => {

    //  Use below for playing intro animation only once per session

    // const [showAnimation, setShowAnimation] = useState(false);
    //
    // useEffect(() => {
    //     // Check if the 'hasSeenAnimation' key exists in sessionStorage
    //     const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    //
    //     if (!hasSeenAnimation) {
    //         // If not seen, show the animation
    //         setShowAnimation(true);
    //
    //         // Set the 'hasSeenAnimation' flag in sessionStorage
    //         sessionStorage.setItem('hasSeenAnimation', 'true');
    //     }
    // }, []);

    return (
        <>
            <Header/>
            <main className="pt-16 xl:pt-20">
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
                <section className="p-7 h-screen">
                    <h1 className="flex flex-col text-5xl md:text-8xl lg:text-9xl xl:text-9xl uppercase font-outfit font-bold">
                        <motion.span
                            className="w-fit"
                            initial={{x: 50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 2.2,
                                ease: "easeInOut"
                            }}
                        >
                            Ideate.
                        </motion.span>
                        <motion.span
                            className="w-fit pl-12 lg:pl-24"
                            initial={{x: 50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 2.5,
                                ease: "easeInOut"
                            }}
                        >
                            Design.
                        </motion.span>
                        <motion.span
                            className="w-fit pl-24 lg:pl-48 xl:h-48 pb-12 xl:pb-16"
                            initial={{x: 50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 2.8,
                                ease: "easeInOut"
                            }}
                        >
                            Execute.
                        </motion.span>
                        <motion.hr
                            className="border-customBlack dark:border-customWhite"
                            initial={{width: 0}}
                            animate={{width: "100%"}}
                            transition={{
                                duration: 0.5,
                                delay: 3.1,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.span
                            className="w-full text-right xl:h-48 pt-12 xl:pt-16"
                            initial={{x: -50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 3.4,
                                ease: "easeInOut"
                            }}
                        >
                            Art.
                        </motion.span>
                        <motion.span
                            className="w-full text-right pr-12 lg:pr-24"
                            initial={{x: -50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 3.7,
                                ease: "easeInOut"
                            }}
                        >
                            UI/UX.
                        </motion.span>
                        <motion.span
                            className="w-full text-right pr-24 lg:pr-48"
                            initial={{x: -50, opacity: 0}}
                            animate={{x: 0, opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 4.0,
                                ease: "easeInOut"
                            }}
                        >
                            Code.
                        </motion.span>
                    </h1>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Index;
