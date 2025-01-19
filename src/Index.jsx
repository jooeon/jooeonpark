import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion, useScroll, useTransform} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import ScrollTextAnim from "./components/ScrollTextAnim.jsx";
import {useEffect, useState} from "react";


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

    const { scrollYProgress } = useScroll();
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
            setSectionHeight(calculatedFontSize * 8);
        }
    }, [fontSize]);

    // Define the transform mappings for each title layer
    const titleLayer1Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize, fontSize * 0.05]);
    const titleLayer2Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 1.15, fontSize * 0.05]);
    const titleLayer3Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 1.45, fontSize * 0.05]);
    const titleLayer4Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 1.85, fontSize * 0.05]);

    const titleLayer7Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 2.9, fontSize * 0.05]);
    const titleLayer8Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 3.05, fontSize * 0.05]);
    const titleLayer9Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 3.35, fontSize * 0.05]);
    const titleLayer10Y = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 3.75, fontSize * 0.05]);

    const subTitleLayer = useTransform(scrollYProgress, [0, 0.3], [fontSize*(vh/vw) + fontSize * 6.0, fontSize * 0.8]);


    // code below is for the overlapping title texts, which need backgrounds to separate the overlaps
    // however, when it reaches the top of the screen and sticks there, the backgrounds are undesirable since
    // they will interfere with other scrolling elements that overlap with them
    // this ensures the background disappears once it reaches the threshold
    const backgroundToggle = useTransform(scrollYProgress, [0, 0.3], [1, 0], {
        clamp: true, // Ensure values stay within range
    });

    const backgroundColor = useTransform(backgroundToggle, [0, 1], ['transparent', '#000000']);

    return (
        <>
            <Header delay={0.2}/>
            {/* Overlay for "loading" animation on page load */}
            <motion.div
                className="fixed top-0 pointer-events-none h-full w-full font-raleway font-bold uppercase
                        bg-customWhite text-customBlack dark:bg-customBlack dark:text-customWhite z-50"
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
            <main className="relative flex flex-col px-4 md:px-7 w-full h-[300vh]">
                {/* Main landing text */}
                <section
                    className="flex flex-col items-center sticky top-0 mix-blend-difference text-customWhite"
                    style={{ height: `${sectionHeight}px` }} // Dynamically set height
                >
                    <motion.h1
                        className="flex justify-center w-full h-fit z-20 font-bold font-nick uppercase tracking-wide
                        text-2xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-7xl 2xl:text-8xl 3xl:text-10xl 4xl:text-11xl 5xl:text-12xl
                        [&_span]:top-0 [&_span]:leading-[0.68] [&_span]:bg-customWhite [&_span]:dark:bg-customBlack"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.4,
                            delay: 2.0,
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
                        className="outline-text-white
                            text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl font-nick text-transparent"
                        style={{y: subTitleLayer}}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.4,
                            delay: 2.0,
                            ease: "easeIn"
                        }}
                    >
                        Artist, Designer, & Developer
                    </motion.h2>
                </section>
                <section className="flex flex-col items-center h-screen pt-52">
                    <h3 className="w-5/6 outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                        text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl">01</h3>
                    <div className="flex justify-center">
                        <div className="lg:w-6/12 xl:w-5/12 px-12 xl:px-24 leading-tight font-outfit font-semibold uppercase mix-blend-difference text-customWhite
                            lg:text-2xl xl:text-4xl 2xl:text-4xl 3xl:text-6xl">
                            <ScrollTextAnim paragraph={"Software engineer and artist from Seoul, South Korea, specializing in Web Development, UI/UX, Graphic Design, and Visual Arts."} />
                        </div>
                        <motion.div
                            className="lg:w-6/12 xl:w-5/12 flex gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.8,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="bg-customBlack h-fit">
                                <img src="/images/Recollection_main_cropped.jpg" alt="Recollection_art_image" loading="lazy"
                                     className=""
                                />
                            </div>
                            <div className="flex flex-col justify-end uppercase text-xxs 2xl:text-lg">
                                <p className="mb-4 2xl:mb-10 font-bold">Recollection</p>
                                <p className="text-customGray">/ 2024</p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <div className="text-4xl md:text-5xl lg:text-6xl 2xl:text-8xl 3xl:text-10xl
                text-center uppercase font-nick tracking-wider leading-tight
                outline-text-black dark:outline-text-white text-transparent">Art. Design. Code.</div>
            <Footer/>
        </>
    );
};

export default Index;
