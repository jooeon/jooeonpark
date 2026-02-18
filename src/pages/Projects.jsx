import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion} from "motion/react";
import {Link} from "react-router-dom";
import EncryptionText from "../components/EncryptionAnim.jsx";
import {useLenis} from "lenis/react";
import {scrollToTop} from "../Utils.jsx";
import {useEffect} from "react";
import TitleText from "../components/templates/TitleText.jsx";

const Projects = () => {

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main>
                <div className="flex flex-col md:flex-row items-baseline gap-[3vw] xl:gap-[2vw]">
                    <TitleText phrase={"Projects"}/>
                    <motion.p
                        className="leading-none text-[2vh] xl:text-[1vw] font-neueHaasGrotesk font-semibold lowercase
                            pl-3 md:pl-0"
                        initial={{opacity: 0, y: 15}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.35,
                            delay: 1.3,
                            ease: "easeOut",
                        }}
                    >
                        /Web
                    </motion.p>
                </div>
                <section
                    className="flex flex-col items-center px-4 md:px-7 6xl:px-12 7xl:px-14 mt-[5vh] lg:mt-[7vh] xl:mt-[8vw]">
                    <div className="flex flex-col gap-10 xl:grid xl:grid-cols-2 xl:grid-rows-13 xl:gap-x-0 xl:gap-y-24 justify-start xl:justify-center items-center xl:items-start
                                font-neueHaasGrotesk font-bold lowercase">
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col xl:flex-row xl:row-start-1 xl:row-end-5 xl:col-start-1 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "none",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.6,
                                delay: 1.1,
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
                                className="flex flex-col justify-end text-[2vh] lg:text-[1vw] xl:text-left">
                                <p className="mb-4 2xl:mb-10">NYC Citi Bike Data Visualization</p>
                                <p className="text-customGray">2025</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="w-11/12 xl:w-full flex flex-col-reverse xl:flex-row xl:justify-end xl:row-start-4 xl:row-end-8 xl:col-start-2 gap-4"
                            initial={{opacity: 0, y: 70, filter: "blur(10px)",}}
                            whileInView={{opacity: 1, y: 0, filter: "none",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.6,
                                delay: 1.3,
                                ease: "easeOut",
                            }}
                        >
                            <div
                                className="flex flex-col justify-end text-[2vh] lg:text-[1vw] xl:text-right">
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
                            whileInView={{opacity: 1, y: 0, filter: "none",}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.6,
                                delay: 0,
                                ease: "easeOut",
                            }}
                        >
                            <Link to="/projects/rig" className="w-full">
                                <img
                                    src="/images/thumbnails/rig_thumb.jpg"
                                    alt="Random_Image_Generator_Project_Thumbnail"
                                    loading="lazy"
                                    className="w-full"/>
                            </Link>
                            <div
                                className="flex flex-col justify-end text-[2vh] lg:text-[1vw] xl:text-left">
                                <p className="mb-4 2xl:mb-10">R.I.G.</p>
                                <p className="text-customGray">2025</p>
                            </div>
                        </motion.div>
                    </div>
                    <motion.div
                        className="flex justify-center items-center w-full h-screen text:[1.25vh] xl:text-[1.25vw]
                        font-neueHaasGrotesk font-bold lowercase"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true, amount: 0.8}}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        <EncryptionText
                            text={"More projects coming soon..."}
                            delay={0.6}
                            duration={0.3}
                            speed={20}
                        />
                    </motion.div>
                </section>
                {/*<section>*/}
                {/*    <div className="w-full px-3 md:px-4 xl:px-10 mt-[10vh] md:mt-[14vh] xl:mt-[18vh] font-neueHaasGrotesk font-bold lowercase*/}
                {/*        flex flex-col justify-start items-center">*/}
                {/*        <motion.div*/}
                {/*            className="w-full xl:w-1/2"*/}
                {/*            initial={{opacity: 0, y: 70}}*/}
                {/*            whileInView={{opacity: 1, y: 0}}*/}
                {/*            viewport={{once: true}}*/}
                {/*            transition={{*/}
                {/*                duration: 0.6,*/}
                {/*                delay: 1.1,*/}
                {/*                ease: "easeOut",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <div className="">*/}
                {/*            <Link to="/projects/atopol" className="w-full">*/}
                {/*                    <img*/}
                {/*                        src="/images/thumbnails/atopol_thumb.jpg"*/}
                {/*                        alt="Allen_Topolski_portfolio_website_image"*/}
                {/*                        loading="lazy"*/}
                {/*                        className="w-full"/>*/}
                {/*                </Link>*/}
                {/*            </div>*/}
                {/*            <div*/}
                {/*                className="flex justify-between w-full mt-2 xl:mt-4*/}
                {/*                    text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">*/}
                {/*                <p className="">Allen Topolski&apos;s Portfolio</p>*/}
                {/*                <p className="text-customGray">2025</p>*/}
                {/*            </div>*/}
                {/*        </motion.div>*/}
                {/*        <motion.div*/}
                {/*            className="flex justify-center items-center w-full h-screen text:[1.25vh] xl:text-[1.25vw]"*/}
                {/*            initial={{opacity: 0}}*/}
                {/*            whileInView={{opacity: 1}}*/}
                {/*            viewport={{once: true, amount: 0.8}}*/}
                {/*            transition={{*/}
                {/*                duration: 0.6,*/}
                {/*                ease: "easeInOut",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <EncryptionText*/}
                {/*                text={"More projects coming soon..."}*/}
                {/*                delay={0.6}*/}
                {/*                duration={0.3}*/}
                {/*                speed={20}*/}
                {/*            />*/}
                {/*        </motion.div>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </main>
            <Footer/>
        </>
    );
};

export default Projects;