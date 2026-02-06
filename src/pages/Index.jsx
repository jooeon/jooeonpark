import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion, useAnimation, useScroll} from "framer-motion";
import EntryAnim from "../components/EntryAnim.jsx";
import ScrollTextAnim from "../components/textEffects/ScrollTextAnim.jsx";
import {useEffect, useState} from "react";
import EncryptionText from "../components/EncryptionAnim.jsx";
import {Link} from "react-router-dom";
import LayeredScrollTitle from "../components/LayeredScrollTitle.jsx";
import {useLenis} from "lenis/react";
import {pickRandomColor, scrollToTop} from "../Utils.jsx";


const Index = () => {

    const [linkColor, setLinkColor] = useState("#fafafa");

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
    const [isXLargeScreen, setIsXLargeScreen] = useState(window.innerWidth >= 3840);

    useEffect(() => {
        const handleResize = () => {
            setIsXLargeScreen(window.innerWidth >= 3840);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
            <main className="relative flex flex-col px-4 md:px-7 6xl:px-12 7xl:px-14 pb-20 xl:pb-40 w-full gap-48 md:gap-[20vw]">
                {/* Main landing text */}
                <LayeredScrollTitle showEntryAnimation={showAnimation}/>
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-lack dark:outline-text-white text-transparent font-nick pb-5
                            text-[3vw] leading-none">
                            About
                        </h3>
                    </div>
                    <div
                        className="flex flex-col xl:flex-row gap-10 xl:gap-0 justify-start xl:justify-center items-center xl:items-start">
                        <div className="w-11/12 xl:w-11/12 xl:px-24 font-bold font-neueHaasGrotesk uppercase mix-blend-difference text-customWhite [&_span]:lg:mb-2
                            md:text-xl lg:text-3xl xl:text-4xl 2xl:text-6xl 3xl:text-6xl 5xl:text-8xl 6xl:text-9xl 7xl:text-11xl">
                            <ScrollTextAnim
                                paragraph={"Multidisciplinary creative from Seoul [based in NYC].\nFrom concept to execution,\nI design it, I build it.\n[Web Development, UI/UX, Graphic Design, and Visual Arts]"}
                            />
                        </div>
                    </div>
                </section>
                {/* For when there is only one work to show */}
                {/*<section className="flex flex-col items-center">*/}
                {/*    <div className="w-11/12 xl:w-5/6 md:mb-14">*/}
                {/*        <h3 className="w-fit outline-text-black dark:outline-text-lack dark:outline-text-white text-transparent font-nick pb-5*/}
                {/*            text-[3vw] leading-none">*/}
                {/*            Recent Work*/}
                {/*        </h3>*/}
                {/*    </div>*/}
                {/*    <motion.div*/}
                {/*        className="w-11/12 xl:w-5/6 font-neueHaasGrotesk font-bold lowercase*/}
                {/*        flex flex-col xl:grid xl:grid-cols-[1fr_6fr_1fr] justify-start xl:justify-center items-center xl:items-start"*/}
                {/*        initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)",}}*/}
                {/*        viewport={{once: false}}*/}
                {/*        transition={{*/}
                {/*            duration: 0.6,*/}
                {/*            ease: "easeInOut",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <div className="w-full xl:col-start-2 xl:px-10">*/}
                {/*            <Link to="/projects/atopol" className="w-full">*/}
                {/*                <img*/}
                {/*                    src="/images/thumbnails/atopol_thumb.jpg"*/}
                {/*                    alt="Allen_Topolski_portfolio_website_image"*/}
                {/*                    loading="lazy"*/}
                {/*                    className="w-full"/>*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*        <div*/}
                {/*            className="flex flex-col justify-end h-full w-full xl:col-start-1 xl:row-start-1 xl:text-right text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">*/}
                {/*            <p className="mb-4 2xl:mb-10">Allen Topolski&apos;s Portfolio</p>*/}
                {/*            <p className="text-customGray">2025</p>*/}
                {/*        </div>*/}
                {/*    </motion.div>*/}
                {/*</section>*/}
                {/* Selected works scroll gallery */}
                <section className="flex flex-col items-center">
                    <div className="w-11/12 xl:w-5/6 md:mb-14">
                        <h3 className="w-fit outline-text-black dark:outline-text-white text-transparent font-nick pb-5
                            text-[3vw] leading-none">
                                    Selected Works
                                </h3>
                            </div>
                    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:grid-rows-13 xl:gap-x-0 xl:gap-y-[7vw] justify-start xl:justify-center items-center xl:items-start
                                font-neueHaasGrotesk font-bold lowercase">
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-1 xl:row-end-5 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        >
                            <Link to="/projects/citibike" className="w-full">
                                <img
                                    src="/images/thumbnails/citibike_thumb.jpg"
                                    alt="NYC_Citi_Bike_Data_Visualization_Image"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                            <div
                                className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">
                                <p className="mb-4 2xl:mb-10">NYC Citi Bike Data Visualization</p>
                                <p className="text-customGray">2025</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:justify-end xl:row-start-4 xl:row-end-8 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        >
                            <div
                                className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl xl:text-right">
                                <p className="mb-4 2xl:mb-10">Allen Topolski&apos;s Portfolio</p>
                                <p className="text-customGray">2025</p>
                            </div>
                            <Link to="/projects/atopol" className="w-full">
                                <img
                                    src="/images/thumbnails/atopol_thumb.jpg"
                                    alt="Allen_Topolski_portfolio_website_image"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-7 xl:row-end-11 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        >
                            <Link to="/design/post-realm-runway" className="w-full">
                                <img
                                    src="/images/thumbnails/nyfw_runway_thumb.jpg"
                                    alt="nyfw_runway_poster_design_image"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                            <div
                                className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">
                                <p className="mb-4 2xl:mb-10">NYFW '26 Poster Design</p>
                                <p className="text-customGray">2026</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:justify-end xl:row-start-10 xl:row-end-14 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "blur(0px)",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        >
                            <div
                                className="flex flex-col justify-end text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl xl:text-right">
                                <p className="mb-4 2xl:mb-10">Demiurgo Branding Mockup</p>
                                <p className="text-customGray">2026</p>
                            </div>
                            <Link to="/design/demiurgo-mock" className="w-full xl:w-9/12">
                                <img
                                    src="/images/thumbnails/demiurgo-thumb.png"
                                    alt="Demiurgo_branding_design_mockup_image"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                        </motion.div>
                    </div>
                </section>
                <section className="flex justify-center items-center h-96 md:h-[70vh]">
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
                text-center uppercase font-nick tracking-wider leading-tight outline-text-black dark:outline-text-lack dark:outline-text-white text-transparent
                pb-2 sm:pb-5 lg:pb-10">
                <Link to="/art" className="outline-text-b lack dark:outline-text-white">
                    <motion.span
                        onHoverStart={() => {
                            const newColor = pickRandomColor();
                            setLinkColor(newColor);
                        }}
                        whileHover={{
                            color: linkColor,
                            opacity: 0.9,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Art
                    </motion.span>
                </Link>
                <span>. </span>
                <Link to="/design" className="outline-text-black dark:outline-text-white">
                    <motion.span
                        onHoverStart={() => {
                            const newColor = pickRandomColor();
                            setLinkColor(newColor);
                        }}
                        whileHover={{
                            color: linkColor,
                            opacity: 0.9,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Design
                    </motion.span>
                </Link>
                <span>. </span>
                <Link to="/projects" className="outline-text-black dark:outline-text-white">
                    <motion.span
                        onHoverStart={() => {
                            const newColor = pickRandomColor();
                            setLinkColor(newColor);
                        }}
                        whileHover={{
                            color: linkColor,
                            opacity: 0.9,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Code
                    </motion.span>
                </Link>
                <span>.</span>
            </div>
            <Footer/>
        </>
    );
};

export default Index;
