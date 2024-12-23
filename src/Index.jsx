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

    const container = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    }

    const leftText = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    }

    const line = {
        hidden: { width: 0 },
        visible: { width: "100%" },
    }

    const rightText = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    }

    return (
        <>
            <Header/>
            <main className="">
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full
                        bg-customWhite text-customBlack dark:bg-customBlack dark:text-customWhite z-20"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.5,
                        delay: 1.8,
                        ease: "easeOut"
                    }}
                >
                    <EntryAnim/>
                </motion.div>
                <section className="flex justify-center items-center p-7 h-screen">
                    <h1 className="uppercase font-outfit">
                        <motion.span
                            className="w-fit"
                            initial={{opacity: 0, filter: "blur(20px)"}}
                            animate={{opacity: 1, filter: "blur(0px)"}}
                            transition={{
                                duration: 1.0,
                                delay: 2.2,
                                ease: "easeOut"
                            }}
                        >
                            Multidisciplinary
                        </motion.span>
                    </h1>
                </section>
                <section className="p-7 h-screen">
                    <motion.h2
                        className="sticky top-0 flex flex-col text-5xl md:text-8xl lg:text-9xl xl:text-9xl uppercase font-outfit font-bold"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ amount: "all", once: true }}
                        variants={container}
                    >
                        <motion.span
                            className="w-fit"
                            variants={leftText}
                            transition={{
                                duration: 0.5,
                                delay: 0,
                                ease: "easeInOut"
                            }}
                        >
                            Ideate.
                        </motion.span>
                        <motion.span
                            className="w-fit pl-12 lg:pl-24"
                            variants={leftText}
                            transition={{
                                duration: 0.5,
                                delay: 0.3,
                                ease: "easeInOut"
                            }}
                        >
                            Design.
                        </motion.span>
                        <motion.span
                            className="w-fit pl-24 lg:pl-48 xl:h-48 pb-12 xl:pb-16"
                            variants={leftText}
                            transition={{
                                duration: 0.5,
                                delay: 0.6,
                                ease: "easeInOut"
                            }}
                        >
                            Execute.
                        </motion.span>
                        <motion.hr
                            className="border-customBlack dark:border-customWhite"
                            variants={line}
                            transition={{
                                duration: 0.5,
                                delay: 0.9,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.span
                            className="w-full text-right xl:h-48 pt-12 xl:pt-16"
                            variants={rightText}
                            transition={{
                                duration: 0.5,
                                delay: 1.2,
                                ease: "easeInOut"
                            }}
                        >
                            Art.
                        </motion.span>
                        <motion.span
                            className="w-full text-right pr-12 lg:pr-24"
                            variants={rightText}
                            transition={{
                                duration: 0.5,
                                delay: 1.5,
                                ease: "easeInOut"
                            }}
                        >
                            UI/UX.
                        </motion.span>
                        <motion.span
                            className="w-full text-right pr-24 lg:pr-48"
                            variants={rightText}
                            transition={{
                                duration: 0.5,
                                delay: 1.8,
                                ease: "easeInOut"
                            }}
                        >
                            Code.
                        </motion.span>
                    </motion.h2>
                </section>
            </main>
            <Footer/>
        </>
);
};

export default Index;
