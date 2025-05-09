import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion, useAnimation, useScroll} from "framer-motion";
import EntryAnim from "../components/EntryAnim.jsx";
import ScrollTextAnim from "../components/ScrollTextAnim.jsx";
import {useEffect, useState} from "react";
import EncryptionText from "../components/EncryptionAnim.jsx";
import {Link} from "react-router-dom";
import LayeredScrollTitle from "../components/LayeredScrollTitle.jsx";
import {useLenis} from "lenis/react";
import {scrollToTop} from "../Utils.jsx";


const Index = () => {

    //  Use below for playing intro animation only once per session

    const [showAnimation] = useState(() => {
        // if there is no flag yet, we want to animate immediately
        const seen = sessionStorage.getItem("hasSeenAnimation");
        return !seen;
    });

    useEffect(() => {
        if (showAnimation) {
            // mark it so next full‑reload in this tab won’t re‑animate
            sessionStorage.setItem("hasSeenAnimation","true");
        }
    }, [showAnimation]);

    // 4k or larger, for rendering full resolution images if screen resolution is large
    // const [isXLargeScreen, setIsXLargeScreen] = useState(window.innerWidth >= 3840);
    //
    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsXLargeScreen(window.innerWidth >= 3840);
    //     };
    //
    //     window.addEventListener("resize", handleResize);
    //
    //     return () => {
    //         window.removeEventListener("resize", handleResize);
    //     };
    // }, []);

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    // ************************
    // Start of scrolling behavior logic
    // ************************

    const { scrollYProgress } = useScroll();

    // Animation controller for triggering animation when scroll reaches the bottom of the page
    const controls = useAnimation();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change",(latest) => {
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
            <Header/>
            {/* Overlay for "loading" animation on page load */}
            {showAnimation &&
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
            }
            <main className="relative flex flex-col px-4 md:px-7 6xl:px-12 7xl:px-14 pb-20 xl:pb-40 w-full gap-48 md:gap-96">
                {/* Main landing text */}
                <LayeredScrollTitle showEntryAnimation={showAnimation}/>
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-[3vw] leading-none">
                            About
                        </h3>
                    </div>
                    <div
                        className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-start xl:justify-center items-center xl:items-start">
                        <div className="w-11/12 xl:w-11/12 xl:px-24 font-extrabold font-neueHaasGrotesk uppercase mix-blend-difference text-customWhite [&_span]:lg:mb-2
                            md:text-xl lg:text-3xl xl:text-4xl 2xl:text-6xl 3xl:text-6xl 5xl:text-8xl 6xl:text-9xl 7xl:text-11xl">
                            <ScrollTextAnim
                                paragraph={"Artist and Creative Developer from Seoul, South Korea, specializing in Web Development, UI/UX Design, and Visual Arts.\nSeamlessly integrating design and technology to create experiences that are both highly functional and stylish."}
                            />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-[3vw] leading-none">
                            Recent Work
                        </h3>
                    </div>
                    <motion.div
                        className="w-11/12 xl:w-5/6 font-neueHaasGrotesk font-bold lowercase
                        flex flex-col xl:grid xl:grid-cols-[1fr_6fr_1fr] justify-start xl:justify-center items-center xl:items-start"
                        initial={{opacity: 0, y: 70}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: false}}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="w-full xl:col-start-2 xl:px-10">
                            <Link to="/project/atopol" className="w-full">
                                <img
                                    src="/images/thumbnails/atopol_thumb.jpg"
                                    alt="Allen_Topolski_portfolio_website_image"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                        </div>
                        <div
                            className="flex flex-col justify-end h-full w-full xl:col-start-1 xl:row-start-1 xl:text-right text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">
                            <p className="mb-4 2xl:mb-10">Allen Topolski&apos;s Portfolio</p>
                            <p className="text-customGray">2025</p>
                        </div>
                    </motion.div>
                </section>
                {/* Art scroll gallery, use this format once more web projects are added */}
                {/*<section className="flex flex-col items-center">*/}
                {/*    <div className="w-11/12 xl:w-5/6 md:mb-14">*/}
                {/*        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5*/}
                {/*            text-[3vw] leading-none">*/}
                        {/*            Selected Works*/}
                        {/*        </h3>*/}
                        {/*    </div>*/}
                        {/*    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:grid-rows-13 xl:gap-x-0 xl:gap-y-24 justify-start xl:justify-center items-center xl:items-start*/}
                        {/*        font-neueHaasGrotesk font-bold lowercase">*/}
                        {/*        <motion.div*/}
                        {/*            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-1 xl:row-end-5 xl:col-start-1 gap-4"*/}
                        {/*            initial={{opacity: 0, y: 70}}*/}
                        {/*            whileInView={{opacity: 1, y: 0}}*/}
                        {/*            viewport={{once: false}}*/}
                        {/*            transition={{*/}
                        {/*                duration: 0.6,*/}
                        {/*                ease: "easeInOut",*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <Link to="/project/recollection" className="w-full xl:w-5/6">*/}
                        {/*                { isXLargeScreen ?*/}
                        {/*                    <img*/}
                        {/*                        src="/images/Recollection_main_cropped.jpg"*/}
                        {/*                        alt="Recollection_art_image"*/}
                        {/*                        loading="lazy"*/}
                        {/*                        className="w-full"/>*/}
                        {/*                    :*/}
                        {/*                    <img*/}
                        {/*                        src="/images/Recollection_main_cropped_smaller.jpg"*/}
                        {/*                        alt="Recollection_art_image"*/}
                        {/*                        loading="lazy"*/}
                        {/*                        className="w-full"/>*/}
                        {/*                }*/}
                        {/*            </Link>*/}
                        {/*            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">*/}
                        {/*                <p className="mb-4 2xl:mb-10">Recollection</p>*/}
                        {/*                <p className="text-customGray">2024</p>*/}
                        {/*            </div>*/}
                        {/*        </motion.div>*/}
                        {/*        <motion.div*/}
                        {/*            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:justify-end xl:row-start-4 xl:row-end-8 xl:col-start-2 gap-4"*/}
                        {/*            initial={{opacity: 0, y: 70}}*/}
                        {/*            whileInView={{opacity: 1, y: 0}}*/}
                        {/*            viewport={{once: false}}*/}
                        {/*            transition={{*/}
                        {/*                duration: 0.6,*/}
                        {/*                ease: "easeInOut",*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl xl:text-right">*/}
                        {/*                <p className="mb-4 2xl:mb-10">11,182,156 Steps</p>*/}
                        {/*                <p className="text-customGray">2024</p>*/}
                        {/*            </div>*/}
                        {/*            <Link to="/project/steps" className="w-full xl:w-5/6">*/}
                        {/*                <video*/}
                        {/*                    autoPlay*/}
                        {/*                    playsInline*/}
                        {/*                    muted*/}
                        {/*                    loop*/}
                        {/*                    className="w-full"*/}
                        {/*                >*/}
                        {/*                    <source src="/videos/polychrome_dark.mp4#t=70" type="video/mp4"/>*/}
                        {/*                    Your browser does not support the video tag.*/}
                        {/*                </video>*/}
                        {/*            </Link>*/}
                        {/*        </motion.div>*/}
                        {/*        <motion.div*/}
                        {/*            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-7 xl:row-end-11 xl:col-start-1 gap-4"*/}
                        {/*            initial={{opacity: 0, y: 70}}*/}
                        {/*            whileInView={{opacity: 1, y: 0}}*/}
                        {/*            viewport={{once: false}}*/}
                        {/*            transition={{*/}
                        {/*                duration: 0.6,*/}
                        {/*                ease: "easeInOut",*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <Link to="/project/ocular-prosthetic" className="w-full xl:w-5/6">*/}
                        {/*                { isXLargeScreen ?*/}
                        {/*                    <img*/}
                        {/*                        src="/images/Ocular%20Prosthetic%20for%20Reading%20Another%20Human_01.jpg"*/}
                        {/*                        alt="Ocular_prostetic_art_image"*/}
                        {/*                        loading="lazy"*/}
                        {/*                        className="w-full"/>*/}
                        {/*                    :*/}
                        {/*                    <img*/}
                        {/*                        src="/images/thumbnails/Ocular%20Prosthetic%20for%20Reading%20Another%20Human_thumb.jpg"*/}
                        {/*                        alt="Ocular_prostetic_art_image"*/}
                        {/*                        loading="lazy"*/}
                        {/*                        className="w-full"/>*/}
                        {/*                }*/}
                        {/*            </Link>*/}
                        {/*            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">*/}
                        {/*                <p className="mb-4 2xl:mb-10">Ocular Prosthetic for Reading Another Human</p>*/}
                        {/*                <p className="text-customGray">2024</p>*/}
                        {/*            </div>*/}
                        {/*        </motion.div>*/}
                        {/*        <motion.div*/}
                        {/*            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:justify-end xl:row-start-10 xl:row-end-13 xl:col-start-2 gap-4"*/}
                        {/*            initial={{opacity: 0, y: 70}}*/}
                        {/*            whileInView={{opacity: 1, y: 0}}*/}
                        {/*            viewport={{once: false}}*/}
                        {/*            transition={{*/}
                        {/*                duration: 0.6,*/}
                        {/*                ease: "easeInOut",*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            <div className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl xl:text-right">*/}
                        {/*                <p className="mb-4 2xl:mb-10">On The Tracks</p>*/}
                        {/*                <p className="text-customGray">2024</p>*/}
                        {/*            </div>*/}
                        {/*            <Link to="/project/on-the-tracks" className="w-full xl:w-5/6">*/}
                        {/*                <video*/}
                        {/*                    autoPlay*/}
                        {/*                    playsInline*/}
                        {/*                    muted*/}
                        {/*                    loop*/}
                        {/*                    className="w-full"*/}
                        {/*                >*/}
                        {/*                    <source src="/videos/JooEon_Park_OnTheTracks_Video.MOV#t=4" type="video/mp4"/>*/}
                        {/*                    Your browser does not support the video tag.*/}
                        {/*                </video>*/}
                        {/*            </Link>*/}
                        {/*        </motion.div>*/}
                        {/*    </div>*/}
                        {/*</section>*/}
                        <section className="flex justify-center items-center h-96 md:h-[80vh]">
                            <motion.div
                                className="relative top-1/4 flex justify-center gap-5 md:gap-10 lg:gap-14 xl:gap-20 3xl:gap-30 6xl:gap-72 font-nick lowercase
                        text-[2vw] px-5 xl:px-7"
                                initial="hidden"
                                animate={controls}
                                variants={{
                                    hidden: {opacity: 0},
                                    visible: {opacity: 1},
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
                                      rel="noopener noreferrer"
                                      className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                    <EncryptionText
                                        text={"LinkedIn"}
                                        delay={0.4}
                                        duration={0.4}
                                        speed={20}
                                    />
                                </Link>
                                <Link to="https://github.com/jooeon" target="_blank" rel="noopener noreferrer"
                                      className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                    <EncryptionText
                                        text={"GitHub"}
                                        delay={0.4}
                                        duration={0.4}
                                        speed={20}
                                    />
                                </Link>
                                <Link to="mailto:jooeon427@gmail.com" target="_blank" rel="noopener noreferrer"
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
