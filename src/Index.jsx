import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import EncryptionText from "./components/EncryptionAnim.jsx";
import { useEffect, useState } from "react";
import AsciiAnimation from "./components/AsciiAnim.jsx";

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

    // const container = {
    //     hidden: { opacity: 1 },
    //     visible: { opacity: 1 },
    // }
    //
    // const leftText = {
    //     hidden: { x: 50, opacity: 0 },
    //     visible: { x: 0, opacity: 1 },
    // }
    //
    // const line = {
    //     hidden: { width: 0, opacity: 0 },
    //     visible: { width: "100%", opacity: 1 },
    // }
    //
    // const rightText = {
    //     hidden: { x: -50, opacity: 0 },
    //     visible: { x: 0, opacity: 1 },
    // }

    return (
        <>
            <Header delay={2.4}/>
            <motion.main>
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full font-raleway
                        dark:bg-customWhite dark:text-customBlack bg-customBlack text-customWhite z-50"
                    initial={{y: 0}}
                    animate={{y: "-100%"}}
                    transition={{
                        duration: 0.8,
                        delay: 1.8,
                        ease: [0.16, 1, 0.3, 1] // easeOutExpo
                    }}
                >
                    <EntryAnim/>
                </motion.div>
                {/* Cube animation */}
                <AsciiAnimation/>
                <div className="absolute top-0 flex flex-wrap w-full -z-10 *:w-1/4 *:h-90vh
                    *:border-customGrayLight *:dark:border-customBlackLight *:border-b">
                    <div className="border-r"></div>
                    <div className="border-r"></div>
                    <div className="border-r"></div>
                    <div className=""></div>
                    {/*<div className="border-r"></div>*/}
                    {/*<div className="border-r"></div>*/}
                    {/*<div className="border-r"></div>*/}
                    {/*<div className=""></div>*/}
                </div>
                {/* Main landing text */}
                <section className="flex justify-center items-center p-7 h-90vh">
                    <h1 className="flex items-center flex-col gap-2 lg:gap-4 2xl:gap-14 z-20
                        text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl uppercase font-azeret">
                        <motion.span
                            className="min-h-9 md:min-h-16 lg:min-h-20 xl:min-h-32 text-customGray"
                            initial={{opacity: 0, y: 150}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 1.0,
                                delay: 2.0,
                                ease: [0.16, 1, 0.3, 1] // easeOutExpo
                            }}
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
                                delay: 3.2,
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
                {/*<section className="flex p-7 h-90vh">*/}
                {/*    <motion.div*/}
                {/*        className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl p-5"*/}
                {/*    >*/}
                {/*        <h2 className="text-customGray uppercase mb-5 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg">*/}
                {/*            <EncryptionText*/}
                {/*                text={"// About"}*/}
                {/*                delay={2.0}*/}
                {/*                duration={0.5}*/}
                {/*                speed={20}*/}
                {/*            />*/}
                {/*        </h2>*/}
                {/*        <p>Artist, designer, and software engineer with a background in Computer Science, Digital Media, and Studio Arts.</p>*/}
                {/*        <br/>*/}
                {/*        <p>Multidisciplinary expertise in Visual Arts, Graphic Design, UI/UX, Human-Computer Interaction, and Full-Stack Web Development.*/}
                {/*            Seamlessly integrating visual arts, design, and technology to create experiences that are built upon functional and visual satisfaction.</p>*/}
                {/*    </motion.div>*/}
                {/*</section>*/}
                {/*<section className="p-7 h-90vh">*/}
                {/*    <motion.div*/}
                {/*        className="flex flex-col text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl*/}
                {/*            uppercase font-raleway font-bold"*/}
                {/*        initial="hidden"*/}
                {/*        whileInView="visible"*/}
                {/*        viewport={{amount: 0.5, once: true}}*/}
                {/*        variants={container}*/}
                {/*    >*/}
                {/*        <motion.span*/}
                {/*            className="w-fit"*/}
                {/*            variants={leftText}*/}
                {/*            transition={{*/}
                {/*                duration: 0.5,*/}
                {/*                delay: 0,*/}
                {/*                ease: "easeInOut"*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Ideate.*/}
                {/*        </motion.span>*/}
                {/*        <motion.span*/}
                {/*            className="w-fit pl-12 lg:pl-24"*/}
                {/*            variants={leftText}*/}
                {/*            transition={{*/}
                {/*                duration: 0.5,*/}
                {/*                delay: 0.3,*/}
                {/*                ease: "easeInOut"*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Design.*/}
                {/*        </motion.span>*/}
                {/*        <motion.span*/}
                {/*            className="w-fit pl-24 lg:pl-48 xl:h-48 pb-12 xl:pb-16"*/}
                {/*            variants={leftText}*/}
                {/*            transition={{*/}
                {/*                duration: 0.5,*/}
                {/*                delay: 0.6,*/}
                {/*                ease: "easeInOut"*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            Execute.*/}
                {/*        </motion.span>*/}
                {/*        <motion.hr*/}
                {/*            className="border-customBlack dark:border-customWhite"*/}
                {/*            variants={line}*/}
                {/*            transition={{*/}
                {/*                duration: 0.5,*/}
                {/*                delay: 0.9,*/}
                {/*                ease: "easeInOut"*/}
                {/*            }}*/}
                {/*        />*/}
                {/*        <div className="w-full">*/}
                {/*            <motion.span*/}
                {/*                className="w-fit float-right xl:h-48 pt-12 xl:pt-16"*/}
                {/*                variants={rightText}*/}
                {/*                transition={{*/}
                {/*                    duration: 0.5,*/}
                {/*                    delay: 1.2,*/}
                {/*                    ease: "easeInOut"*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Art.*/}
                {/*            </motion.span>*/}
                {/*        </div>*/}
                {/*        <div className="w-full">*/}
                {/*            <motion.span*/}
                {/*                className="w-fit float-right pr-12 lg:pr-24"*/}
                {/*                variants={rightText}*/}
                {/*                transition={{*/}
                {/*                    duration: 0.5,*/}
                {/*                    delay: 1.5,*/}
                {/*                    ease: "easeInOut"*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                UI/UX.*/}
                {/*            </motion.span>*/}
                {/*        </div>*/}
                {/*        <div className="w-full">*/}
                {/*            <motion.span*/}
                {/*                className="w-fit float-right pr-24 lg:pr-48"*/}
                {/*                variants={rightText}*/}
                {/*                transition={{*/}
                {/*                    duration: 0.5,*/}
                {/*                    delay: 1.8,*/}
                {/*                    ease: "easeInOut"*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                Coding.*/}
                {/*            </motion.span>*/}
                {/*        </div>*/}
                {/*    </motion.div>*/}
                {/*</section>*/}
            </motion.main>
            <Footer/>
        </>
    );
};

export default Index;
