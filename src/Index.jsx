import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import ScrollTextAnimation from "./components/ScrollTextAnim.jsx";

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

    // // encryption style landing animation
    // const words = ["/03-Developer", "/01-Artist", "/02-Designer"];
    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    //
    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Cycle through words
    //     }, 3000); // Delay of 4 seconds before switching words
    //
    //     return () => clearTimeout(interval); // Cleanup timeout on unmount
    // }, [currentWordIndex, words.length]); // Re-run when the current word changes

    // get absolute scroll position in pixels
    // const { scrollY } = useScroll();

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
            <motion.main className="pt-10 lg:pt-14">
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full font-raleway font-bold uppercase
                        dark:bg-customWhite dark:text-customBlack bg-customBlack text-customWhite z-50"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.8,
                        delay: 1.8,
                        ease: [0.16, 1, 0.3, 1] // easeOutExpo
                    }}
                >
                    <EntryAnim/>
                </motion.div>
                {/* Main landing text */}
                <section className="relative flex flex-col items-end gap-5 p-4 md:p-7 w-fit h-fit">
                    <motion.h1
                        className="title-text w-min h-5/6 z-20 font-poppins font-extrabold lowercase
                        text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-12xl 2xl:text-12xl 3xl:text-17xl"
                        initial={{filter: 'blur(10px)'}}
                        animate={{filter: 'blur(0px)'}}
                        transition={{
                            duration: 0.75,
                            delay: 2.0,
                            ease: "easeOut" // easeOutExpo
                        }}
                    >
                        Design & Engineering
                    </motion.h1>
                    <h2 className="absolute -bottom-16 -right-32 flex flex-col items-end gap-4 w-fit
                        font-poppins font-semibold
                        text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl">
                        <motion.span
                            className="title-text w-fit pr-96"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.75,
                                delay: 2.0,
                                ease: "easeOut" // easeOutExpo
                            }}
                        >
                            of platforms for creative expression
                        </motion.span>
                        <motion.span
                            className="title-text w-fit"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.75,
                                delay: 2.0,
                                ease: "easeOut" // easeOutExpo
                            }}
                        >
                            built for high performance and timeless aesthetics
                        </motion.span>
                    </h2>
                </section>
                {/* Content section */}
                <section className="relative flex flex-col gap-14 sm:gap-20 p-7 pb-20 h-fit">
                    {/* About text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl lg:p-5 font-poppins">
                        <h2 className="text-customGray mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg lowercase">
                            About
                        </h2>
                        <ScrollTextAnimation
                            paragraph={"Artist, designer, and software engineer with diverse backgrounds in Computer Science, Digital Media, and Studio Art, bringing multidisciplinary expertise in Full-Stack Web Development, Human-Computer Interaction, Graphic Design, UI/UX, and Visual Arts."}/>
                        <br/>
                        <ScrollTextAnimation
                            paragraph={"Seamlessly integrating design and technology to create experiences that are both highly functional and stylish."}/>
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
