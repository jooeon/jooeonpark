import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion, useScroll } from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import EncryptionText from "./components/EncryptionAnim.jsx";
import { useEffect, useState } from "react";
import AsciiAnimation from "./components/AsciiAnim.jsx";
import ScrollTextAnimation from "./components/ScrollTextAnim.jsx";
import ParallaxText from "./components/ParallaxText.jsx";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

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

    // get absolute scroll position in pixels
    const { scrollY } = useScroll();

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
                {/* Main landing text */}
                <section className="relative flex justify-center items-center p-7 h-90vh">
                    <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4 *:border-b
                    *:border-customGrayLight *:dark:border-customBlackLight">
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className=""></div>
                    </div>
                    <h1 className="flex items-center flex-col gap-2 lg:gap-4 2xl:gap-14 z-20 uppercase font-azeret">
                        <motion.span
                            className="min-h-9 md:min-h-16 lg:min-h-20 xl:min-h-32 text-customGray
                                text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
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
                            className="min-h-9 md:min-h-16 lg:min-h-20 xl:min-h-32
                                text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
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
                {/* Content section */}
                <section className="relative flex flex-col gap-14 sm:gap-20 p-7 pb-20 h-fit">
                    <div className="absolute top-0 left-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4 *:border-b
                    *:border-customGrayLight *:dark:border-customBlackLight">
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className=""></div>
                    </div>
                    {/* About text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl lg:p-5">
                        <h2 className="text-customGray uppercase mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg">
                            <EncryptionText
                                text={"// About"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <ScrollTextAnimation
                            paragraph={"Artist, designer, and software engineer with diverse backgrounds in Computer Science, Digital Media, and Visual Art, bringing multidisciplinary expertise in Full-Stack Web Development, Human-Computer Interaction, Graphic Design, UI/UX, and Visual Arts."}/>
                        <br/>
                        <ScrollTextAnimation
                            paragraph={"Seamlessly integrating design and technology to create experiences that are both highly functional and visually engaging."}/>
                    </div>
                    {/* Tech stack parallax text */}
                    <div className="text-4xl md:text-5xl lg:text-7xl 2xl:text-8xl mb-10 md:mb-12 lg:mb-[4.5rem] 2xl:mb-24
                        xl:p-5 uppercase">
                        <h2 className="text-customGray uppercase mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg">
                            <EncryptionText
                                text={"// Tech Stack & Software"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <div className="absolute left-0 w-full flex overflow-hidden items-center font-aldrich">
                            <ParallaxText
                                textArray={["react", "next.js", "tailwind", "framer motion", "SQL", "adobe cc", "figma"]}
                                baseVelocity={isMobile ? 50 : 100}
                                scrollY={scrollY}
                            />
                        </div>
                    </div>
                    {/* Connect text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl xl:p-5">
                        <h2 className="text-customGray uppercase mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg">
                            <EncryptionText
                                text={"// Connect"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <div className="flex gap-20">
                            <Link to="https://www.linkedin.com/in/joo-eon-park/" target="_blank"
                                  className="textLink text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                LinkedIn
                            </Link>
                            <Link to="mailto:jooeon427@gmail.com" target="_blank"
                                  className="textLink text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                Email
                            </Link>
                        </div>
                    </div>
                </section>
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
