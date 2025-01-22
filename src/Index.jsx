import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion, useAnimation, useScroll, useTransform} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import ScrollTextAnim from "./components/ScrollTextAnim.jsx";
import {useEffect, useState} from "react";
import EncryptionText from "./components/EncryptionAnim.jsx";
import {Link} from "react-router-dom";


const Index = () => {

    //  Use below for playing intro animation only once per session

    // const [showAnimation, setShowAnimation] = useState(false);un
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

    // const words = ["artist", "designer", "developer"];
    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    //
    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Cycle through words
    //     }, 3000); // Delay of 4 seconds before switching words
    //
    //     return () => clearTimeout(interval); // Cleanup timeout on unmount
    // }, [currentWordIndex, words.length]); // Re-run when the current word changes

    // ************************
    // Start of scrolling behavior logic
    // ************************

    const { scrollYProgress } = useScroll();

    const [isVisible, setIsVisible] = useState(false);   // tracks the visibility of title depending on scroll direction
    const [finalVisible, setFinalVisible] = useState(true); // overrides visibility of scroll direction when hitting top of page
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollThreshold = 5; // Minimum scroll change to detect direction

    // Handle scroll direction. hide title when scrolling up to prevent overlap with navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    setIsVisible(true);
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    setIsVisible(false);
                }

                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Animation controller for triggering animation when scroll reaches the top/bottom of the page
    const controls = useAnimation();
    const [animationState, setAnimationState] = useState("visible"); // Track the current animation state

    // Update animation state when controls.start() is triggered
    const triggerAnimation = async (state) => {
        await controls.start(state); // Trigger the animation
        setAnimationState(state); // Update the local animation state
    };

    useEffect(() => {
        const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
            if (latest >= 0.96 || latest <= 0.2) { // when hitting bottom/top of page
                // Trigger visible animation when at the top or bottom
                void triggerAnimation("visible");
            } else {
                // Trigger hidden animation otherwise
                void triggerAnimation("hidden");
            }
        });

        return () => {
            unsubscribeScroll(); // Cleanup subscription on unmount
        };
    }, [controls, scrollYProgress]);

    useEffect(() => {
        // Combine `isVisible` and animation state to set `finalVisible`
        setFinalVisible(isVisible || animationState === "visible");
    }, [isVisible, animationState]);

    // ************************
    // End of scrolling behavior logic
    // ************************

    const [fontSize, setFontSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Helper to get font size
    const getFontSize = (element) => parseFloat(window.getComputedStyle(element).fontSize);

    useEffect(() => {
        const element = document.querySelector('.title-placeholder'); // Reference to text
        if (element) {
            const calculatedFontSize = getFontSize(element);
            setFontSize(calculatedFontSize);
            // Set section height based on font size
            setSectionHeight(calculatedFontSize * 8.2);
        }
    }, [fontSize]);

    // Define the transform mappings for each title layer
    const titleLayer1Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize, 5]);
    const titleLayer2Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 1.15, 5]);
    const titleLayer3Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 1.45, 5]);
    const titleLayer4Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 1.85, 5]);

    const titleLayer7Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 2.9, 5]);
    const titleLayer8Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 3.05, 5]);
    const titleLayer9Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 3.35, 5]);
    const titleLayer10Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 3.75, 5]);

    const subTitleLayer = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize * 6.0, fontSize * 0.85]);

    // code below is for the overlapping title texts, which need backgrounds to separate the overlaps
    // however, when it reaches the top of the screen and sticks there, the backgrounds are undesirable since
    // they will interfere with other scrolling elements that overlap with them
    // this ensures the background disappears once it reaches the threshold
    const titleToggle = useTransform(scrollYProgress, [0, 0.15], [1, 0], {
        clamp: true, // Ensure values stay within range
    });

    const backgroundColor = useTransform(titleToggle, [0, 1], ['transparent', '#000000']);

    return (
        <>
            <Header isVisible={!isVisible} delay={0.2}/>
            {/* Overlay for "loading" animation on page load */}
            <motion.div
                className="fixed top-0 pointer-events-none h-full w-full font-raleway font-bold uppercase
                        bg-customWhite text-customBlack dark:bg-customBlack dark:text-customWhite z-50"
                initial={{opacity: 1}}
                animate={{opacity: 0}}
                transition={{
                    duration: 0.8,
                    delay: 2.3,
                    ease: [0.16, 1, 0.3, 1] // easeOutExpo
                }}
            >
                <EntryAnim/>
            </motion.div>
            <main className="relative flex flex-col px-4 md:px-7 pb-20 xl:pb-40 w-full gap-96">
                {/* Main landing text */}
                <motion.section
                    className="sticky top-0 flex flex-col items-center mix-blend-difference text-customWhite pointer-events-none"
                    style={{ height: `${sectionHeight}px` }} // Dynamically set height
                    animate={finalVisible ? "visible" : "hidden"}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    transition={{
                        duration: 0.4,
                        delay: 0.2,
                        ease: "easeIn"
                    }}
                >
                    <motion.h1
                        className="flex justify-center w-full h-fit z-20 font-bold font-nick uppercase tracking-wide pointer-events-auto
                        text-2xl xs:text-2xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-8xl 2xl:text-9xl 3xl:text-10xl 4xl:text-11xl 5xl:text-12xl
                        [&_span]:top-0 [&_span]:leading-[0.9] md:[&_span]:leading-[0.68] [&_span]:bg-customWhite [&_span]:dark:bg-customBlack"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.4,
                            delay: 2.5,
                            ease: "easeIn"
                        }}
                    >

                        <div className="absolute top-0 [&_span]:left-0">
                            {/* Invisible placeholder to size the container */}
                            <div className="title-placeholder invisible leading-[0.68]">Multidisciplinary</div>
                            <motion.span className="title-text absolute" style={{y: titleLayer1Y, backgroundColor}}>Multi</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer2Y, backgroundColor}}>Multi</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer3Y, backgroundColor}}>Multi</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer4Y, backgroundColor}}>Multi</motion.span>
                        </div>
                        <div className="absolute top-0 [&_span]:right-0">
                            {/* Invisible placeholder to size the container */}
                            <div className="invisible leading-[0.68]">Multidisciplinary</div>
                            <motion.span className="title-text absolute" style={{y: titleLayer7Y, backgroundColor}}>Disciplinary</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer8Y, backgroundColor}}>Disciplinary</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer9Y, backgroundColor}}>Disciplinary</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer10Y, backgroundColor}}>Disciplinary</motion.span>
                        </div>
                    </motion.h1>
                    <motion.h2
                        className="outline-text-white pointer-events-auto
                            text-sm xs:text-md sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-8xl font-nick text-transparent"
                        style={{y: subTitleLayer}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.4,
                            delay: 2.5,
                            ease: "easeIn"
                        }}
                    >
                        Artist, Designer, & Developer
                    </motion.h2>
                </motion.section>
                <section className="flex flex-col items-center pt-52">
                    <div className="w-11/12 xl:w-5/6 mb-14">
                        <h3 className="w-fit font-nick pb-5 outline-text-black dark:outline-text-white text-transparent
                            text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl">
                            About
                        </h3>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-start xl:justify-center items-center xl:items-start">
                        <div className="w-11/12 xl:w-5/6 xl:px-24 font-regular mix-blend-difference text-customWhite [&_span]:mb-2
                            md:text-xl lg:text-3xl xl:text-4xl 2xl:text-7xl 3xl:text-6xl">
                            <ScrollTextAnim paragraph={"Creative developer and artist from Seoul, South Korea, specializing in Web Development, UI/UX, Graphic Design, and Visual Arts."} />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl">
                            Selected Works
                        </h3>
                    </div>
                    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:gap-x-0 xl:gap-y-40 justify-start xl:justify-center items-center xl:items-start">
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-1 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <img src="/images/Recollection_main_cropped.jpg" alt="Recollection_art_image" loading="lazy"
                                 className="w-full"
                            />
                            <div className="flex flex-col justify-end lowercase text-xxs md:text-base 3xl:text-lg">
                                <p className="mb-4 2xl:mb-10 font-medium">Recollection</p>
                                <p className="text-customGray">2024</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-2 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="flex flex-col justify-end lowercase text-xxs md:text-base 3xl:text-lg xl:text-right">
                                <p className="mb-4 2xl:mb-10 font-medium">11,182,156 Steps</p>
                                <p className="text-customGray">2024</p>
                            </div>
                            <video
                                autoPlay
                                playsInline
                                muted
                                loop
                                className="w-full"
                            >
                                <source src="/videos/polychrome_dark.mp4#t=70" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-3 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <img src="/images/Ocular%20Prosthetic%20for%20Reading%20Another%20Human_01.jpeg" alt="Recollection_art_image" loading="lazy"
                                 className="w-full xl:w-3/5"
                            />
                            <div className="flex flex-col justify-end lowercase text-xxs md:text-base 3xl:text-lg">
                                <p className="mb-4 2xl:mb-10 font-medium">Ocular Prosthetic for Reading Another Human</p>
                                <p className="text-customGray">2024</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
                <section className="flex justify-center items-center h-screen">
                    <motion.div
                        className="relative top-1/4 flex justify-center gap-5 md:gap-10 lg:gap-14 xl:gap-20 font-nick lowercase
                        text-xxs xs:text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-4xl 4xl:text-5xl px-5 xl:px-7"
                        initial="hidden"
                        animate={controls}
                        variants={{
                            hidden: { opacity: 0},
                            visible: { opacity: 1},
                        }}
                        transition={{
                            duration: 0.5,
                            ease: "easeIn",
                        }}
                    >
                        <EncryptionText
                            text={"Connect:"}
                            delay={0.4}
                            duration={0.4}
                            speed={20}
                        />
                        <Link to="https://www.linkedin.com/in/joo-eon-park/" target="_blank"
                              className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                            <EncryptionText
                                text={"LinkedIn"}
                                delay={0.4}
                                duration={0.4}
                                speed={20}
                            />
                        </Link>
                        <Link to="https://github.com/jooeon" target="_blank"
                              className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                            <EncryptionText
                                text={"GitHub"}
                                delay={0.4}
                                duration={0.4}
                                speed={20}
                            />
                        </Link>
                        <Link to="mailto:jooeon427@gmail.com" target="_blank"
                              className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                            <EncryptionText
                                text={"Email"}
                                delay={0.4}
                                duration={0.4}
                                speed={20}
                            />
                        </Link>
                    </motion.div>
                </section>
            </main>
            <div className="title-text text-2xl sm:text-3xl md:text-5xl lg:text-6xl 2xl:text-8xl 3xl:text-10xl
                text-center uppercase font-nick tracking-wider leading-tight outline-text-black dark:outline-text-white text-transparent
                pb-5 sm:pb-10 lg:pb-20">
                Art. Design. Code.
            </div>
            <Footer/>
        </>
    );
};

export default Index;
