import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion, useScroll, useTransform} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import ScrollTextAnim from "./components/ScrollTextAnim.jsx";


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

    // const carouselContent = [
    //     "/videos/carousel/JooEon_Park_OnTheTracks_Video.mp4",
    //     "/images/thumbnails/carousel/Recollection.jpg",
    //     "/images/thumbnails/carousel/The_Workers.jpg",
    //     "/videos/carousel/polychrome.mp4",
    //     "/images/thumbnails/carousel/OnTheTracks_05.jpeg",
    // ];

    const { scrollYProgress } = useScroll();

    // // Map scroll progress to opacity of subtext
    // const scrollOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    //
    // // Map scroll progress to width of lines (reverses from full width to 0 as you scroll)
    // const hrWidth = useTransform(scrollYProgress, [0, 0.3], ["45%", "0%"]);
    // const hrWidth2 = useTransform(scrollYProgress, [0, 0.3], ["20%", "0%"]);

    // Define the transform mappings for each title layer
    const titleLayer1Y = useTransform(scrollYProgress, [0, 0.3], [160, 5]);
    const titleLayer2Y = useTransform(scrollYProgress, [0, 0.3], [184, 5]);
    const titleLayer3Y = useTransform(scrollYProgress, [0, 0.3], [232, 5]);
    const titleLayer4Y = useTransform(scrollYProgress, [0, 0.3], [304, 5]);
    // const titleLayer5Y = useTransform(scrollYProgress, [0, 0.3], [400, 5]);
    // const titleLayer6Y = useTransform(scrollYProgress, [0, 0.3], [520, 5]);

    const titleLayer7Y = useTransform(scrollYProgress, [0, 0.3], [520, 5]);
    const titleLayer8Y = useTransform(scrollYProgress, [0, 0.3], [544, 5]);
    const titleLayer9Y = useTransform(scrollYProgress, [0, 0.3], [590, 5]);
    const titleLayer10Y = useTransform(scrollYProgress, [0, 0.3], [662, 5]);
    // const titleLayer11Y = useTransform(scrollYProgress, [0, 0.3], [758, 5]);
    // const titleLayer12Y = useTransform(scrollYProgress, [0, 0.3], [878, 5]);

    const subTitleLayer = useTransform(scrollYProgress, [0, 0.3], [1000, 130]);

    return (
        <>
            <Header delay={2.4}/>
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
                <section className="flex flex-col items-center sticky top-0 h-screen">
                    <motion.h1
                        className="flex justify-center w-full h-fit z-20 font-bold font-nick uppercase tracking-wide
                        text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-12xl 3xl:text-10xl 4xl:text-14xl 5xl:text-15xl
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
                            <div className="invisible leading-[0.68]">Multidisciplinary</div>
                            <motion.span className="title-text absolute" style={{y: titleLayer1Y}}>Multi</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer2Y}}>Multi</motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer3Y}}>Multi</motion.span>
                            {/*<motion.span className="title-text absolute" style={{y: titleLayer4Y}}>Multi</motion.span>*/}
                            {/*<motion.span className="title-text absolute" style={{y: titleLayer5Y}}>Multi</motion.span>*/}
                            <motion.div className="absolute top-0 flex w-full" style={{y: titleLayer4Y}}>
                                <span className="title-text text-customBlack dark:text-customWhite">Multi</span>
                                <div className="w-full px-3 font-outfit
                                    text-xxs md:text-xs lg:text-sm xl:text-lg">
                                    {/*<motion.div*/}
                                    {/*    className="absolute bottom-6 tracking-normal"*/}
                                    {/*    style={{ opacity: scrollOpacity }} // Fade out on scroll*/}
                                    {/*>*/}
                                    {/*    <p className="uppercase font-semibold">Joo Eon Park</p>*/}
                                    {/*    <p className="font-light leading-6">Artist, Designer, & Developer</p>*/}
                                    {/*</motion.div>*/}
                                    {/*/!* Border *!/*/}
                                    {/*<motion.hr*/}
                                    {/*    className="absolute bottom-3 border border-customBlack dark:border-customWhite"*/}
                                    {/*    initial={{width: 0, opacity: 0}}*/}
                                    {/*    animate={{width: "45%", opacity: 1}}*/}
                                    {/*    transition={{*/}
                                    {/*        duration: 0.8,*/}
                                    {/*        delay: 2.0,*/}
                                    {/*        ease: "easeInOut"*/}
                                    {/*    }}*/}
                                    {/*    style={{ width: hrWidth, opacity: scrollOpacity }} // Dynamic width, opacity on scroll*/}
                                    {/*/>*/}
                                </div>
                            </motion.div>
                        </div>
                        <div className="absolute top-0 [&_span]:right-0">
                            {/* Invisible placeholder to size the container */}
                            <div className="invisible leading-[0.68]">Multidisciplinary</div>
                            <motion.span className="title-text absolute" style={{y: titleLayer7Y}}>Disciplinary
                            </motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer8Y}}>Disciplinary
                            </motion.span>
                            <motion.span className="title-text absolute" style={{y: titleLayer9Y}}>Disciplinary
                            </motion.span>
                            {/*<motion.span className="title-text absolute" style={{y: titleLayer10Y}}>Disciplinary</motion.span>*/}
                            {/*<motion.span className="title-text absolute" style={{y: titleLayer11Y}}>Disciplinary</motion.span>*/}
                            <motion.div className="absolute top-0 flex w-full" style={{y: titleLayer10Y}}>
                                <div className="flex justify-end w-full px-3 font-outfit
                                    text-xxs md:text-xs lg:text-sm xl:text-lg">
                                    {/*<motion.div*/}
                                    {/*    className="absolute bottom-6 tracking-normal"*/}
                                    {/*    style={{ opacity: scrollOpacity }} // Fade out on scroll*/}
                                    {/*>*/}
                                    {/*    <p className="text-right  font-light leading-6">from Seoul, S. Korea</p>*/}
                                    {/*</motion.div>*/}
                                    {/*/!* Border *!/*/}
                                    {/*<motion.hr*/}
                                    {/*    className="absolute bottom-3 border border-customBlack dark:border-customWhite"*/}
                                    {/*    initial={{width: 0, opacity: 0}}*/}
                                    {/*    animate={{width: "20%", opacity: 1}}*/}
                                    {/*    transition={{*/}
                                    {/*        duration: 0.8,*/}
                                    {/*        delay: 2.0,*/}
                                    {/*        ease: "easeInOut"*/}
                                    {/*    }}*/}
                                    {/*    style={{ width: hrWidth2, opacity: scrollOpacity }} // Dynamic width, opacity on scroll*/}
                                    {/*/>*/}
                                </div>
                                <span className="title-text text-customBlack dark:text-customWhite">Disciplinary</span>
                            </motion.div>
                        </div>
                    </motion.h1>
                    <motion.h2
                        className="outline-text-black dark:outline-text-white text-8xl font-nick text-customWhite dark:text-customBlack"
                        style={{y: subTitleLayer}}
                    >
                        Artist, Designer, & Developer
                    </motion.h2>
                </section>
                <section className="h-90vh text-5xl">
                    <div className="w-1/2">
                        <ScrollTextAnim paragraph={"in pursuit of limitless creativity, meticulous design, and flawless execution, seamlessly integrating design and technology to create experiences that are both highly functional and stylish"} />
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Index;
