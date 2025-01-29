import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion, useAnimation, useScroll} from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";
import ScrollTextAnim from "./components/ScrollTextAnim.jsx";
import {useEffect} from "react";
import EncryptionText from "./components/EncryptionAnim.jsx";
import {Link} from "react-router-dom";
import LayeredScrollTitle from "./components/LayeredScrollTitle.jsx";


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

    // Animation controller for triggering animation when scroll reaches the bottom of the page
    const controls = useAnimation();

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (latest >= 0.96) {
                controls.start("visible").catch(() => {}); // Suppress warning
            } else {
                controls.start("hidden").catch(() => {}); // Suppress warning
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [scrollYProgress, controls]);

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
                    delay: 2.3,
                    ease: [0.16, 1, 0.3, 1] // easeOutExpo
                }}
            >
                <EntryAnim/>
            </motion.div>
            <main className="relative flex flex-col px-4 md:px-7 pb-20 xl:pb-40 w-full gap-48 md:gap-96">
                {/* Main landing text */}
                <LayeredScrollTitle />
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl">
                            About
                        </h3>
                    </div>
                    <div className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-start xl:justify-center items-center xl:items-start">
                        <div className="w-11/12 xl:w-11/12 xl:px-24 font-extrabold font-almarai uppercase mix-blend-difference text-customWhite [&_span]:lg:mb-2
                            md:text-xl lg:text-3xl xl:text-4xl 2xl:text-6xl 3xl:text-6xl">
                            <ScrollTextAnim
                                paragraph={"Creative developer and artist from Seoul, South Korea, specializing in Web Development, UI/UX, and Visual Arts.\nSeamlessly integrating design and technology to create experiences that are both highly functional and stylish."}
                            />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-sm xs:text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-6xl 3xl:text-8xl">
                            Selected Works
                        </h3>
                    </div>
                    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:grid-rows-13 xl:gap-x-0 xl:gap-y-24 justify-start xl:justify-center items-center xl:items-start
                        font-almarai font-bold lowercase">
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-1 xl:row-end-5 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <Link to="/project/recollection" className="w-full xl:w-5/6">
                                <img src="/images/Recollection_main_cropped.jpg" alt="Recollection_art_image" loading="lazy"/>
                            </Link>
                            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg">
                                <p className="mb-4 2xl:mb-10">Recollection</p>
                                <p className="text-customGray">2024</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:row-start-4 xl:row-end-8 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg xl:text-right">
                                <p className="mb-4 2xl:mb-10">11,182,156 Steps</p>
                                <p className="text-customGray">2024</p>
                            </div>
                            <Link to="/project/steps" className="w-full xl:w-5/6">
                                <video
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                >
                                    <source src="/videos/polychrome_dark.mp4#t=70" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </Link>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-7 xl:row-end-11 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <Link to="/project/ocular-prosthetic" className="w-full xl:w-5/6">
                                <img src="/images/Ocular%20Prosthetic%20for%20Reading%20Another%20Human_01.jpeg" alt="Recollection_art_image" loading="lazy"/>
                            </Link>
                            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg">
                                <p className="mb-4 2xl:mb-10">Ocular Prosthetic for Reading Another Human</p>
                                <p className="text-customGray">2024</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:row-start-10 xl:row-end-13 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: false}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg xl:text-right">
                                <p className="mb-4 2xl:mb-10">On The Tracks</p>
                                <p className="text-customGray">2024</p>
                            </div>
                            <Link to="/project/on-the-tracks" className="w-full xl:w-5/6">
                                <video
                                    autoPlay
                                    playsInline
                                    muted
                                    loop
                                >
                                    <source src="/videos/JooEon_Park_OnTheTracks_Video.MOV#t=4" type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </Link>
                        </motion.div>
                    </div>
                </section>
                <section className="flex justify-center items-center h-96 md:h-[80vh]">
                    <motion.div
                        className="relative top-1/4 flex justify-center gap-5 md:gap-10 lg:gap-14 xl:gap-20 font-nick lowercase
                        text-3xs xs:text-xs sm:text-sm md:text-lg lg:text-2xl xl:text-4xl 4xl:text-5xl px-5 xl:px-7"
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
            <div className="title-text text-[6vw]
                text-center uppercase font-nick tracking-wider leading-tight outline-text-black dark:outline-text-white text-transparent
                pb-2 sm:pb-5 lg:pb-10">
                Art. Design. Code.
            </div>
            <Footer/>
        </>
    );
};

export default Index;
