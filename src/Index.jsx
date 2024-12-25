import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import EncryptionText from "./components/EncryptionAnim.jsx";
import { useEffect, useState } from "react";

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

    // encryption style landing animation
    const words = ["/03-Developer", "/01-Artist", "/02-Designer"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setTimeout(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Cycle through words
        }, 3000); // Delay of 4 seconds before switching words

        return () => clearTimeout(interval); // Cleanup timeout on unmount
    }, [currentWordIndex, words.length]); // Re-run when the current word changes

    // // scroll animation
    // const { scrollYProgress } = useScroll();
    //
    // const backgroundColor = useTransform(
    //     scrollYProgress,
    //     [0, 0.5],
    //     ["#f1f1f1", "#090909"]
    // )

    const container = {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
    }

    const leftText = {
        hidden: { x: 50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    }

    const line = {
        hidden: { width: 0, opacity: 0 },
        visible: { width: "100%", opacity: 1 },
    }

    const rightText = {
        hidden: { x: -50, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    }

    return (
        <>
            <Header/>
            <motion.main
                className=""
            >
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full font-raleway
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
                    <h1 className="flex items-center flex-col gap-2 md:gap-8 xl:gap-16
                        text-3xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase font-azeret">
                        <motion.span
                            className="min-h-9 md:min-h-16 lg:min-h-20 xl:min-h-32 text-customGray"
                        >
                            <EncryptionText
                                text={"Multidisciplinary"}
                                duration={2.0}
                                speed={20}
                            />
                        </motion.span>
                        <motion.span
                            className="min-h-9 md:min-h-16 lg:min-h-20 xl:min-h-32"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 3.0,
                            }}
                        >
                            <EncryptionText
                                key={currentWordIndex}
                                text={words[currentWordIndex]}
                                duration={0.5}
                                speed={20}
                            />
                        </motion.span>
                    </h1>
                </section>
                <section className="p-7 h-screen">
                    <motion.h2
                        className="sticky top-0 flex flex-col text-5xl md:text-8xl lg:text-9xl xl:text-9xl
                            uppercase font-raleway font-bold"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{amount: 0.9}}
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
                            Coding.
                        </motion.span>
                    </motion.h2>
                </section>
            </motion.main>
            <Footer/>
        </>
);
};

export default Index;
