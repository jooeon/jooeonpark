import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check if the dark mode class is applied
        const html = document.documentElement;
        setIsDarkMode(html.classList.contains("dark"));
    }, []);

    return (
        <>
            <Header/>
            <main>
                <div className="flex flex-col">
                    <motion.div
                        className="pl-5 pt-10 md:pt-20 md:pl-10"
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.3,
                            delay: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        <h1 className="title-text font-nick uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl 4xl:text-9xl">About</h1>
                    </motion.div>
                    <div className="flex flex-col xl:flex-row xl:pt-10 2xl:pt-16 xl:pb-20">
                        <section className="flex justify-center items-center xl:w-50vw
                            py-10 md:py-20 lg:py-28 xl:py-0">
                            <motion.div
                                className="w-3/4 xl:w-1/2 xl:min-w-96 border border-customBlackLight"
                                initial={{opacity: 0, y: 40}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.8,
                                    ease: "easeOut"
                                }}
                            >
                                <img
                                    src={isDarkMode ? "/images/profile.jpg" : "/images/profile_bw.jpg"}
                                    alt="Joo Eon Park Profile Image"
                                    loading="lazy" // Adds lazy loading for performance
                                />
                            </motion.div>
                        </section>
                        <section className="flex flex-col justify-center xl:w-50vw pb-10 px-8 md:px-12 lg:px-16 xl:pl-10 xl:pr-40">
                            {/*<h1 className="title-text flex flex-col gap-2 xl:gap-4 xl:flex-row uppercase font-poppins font-bold*/}
                            {/*    text-4xl lg:text-5xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">*/}
                            {/*    <motion.span*/}
                            {/*        className=""*/}
                            {/*        initial={{opacity: 0, filter: 'blur(3px)'}}*/}
                            {/*        animate={{opacity: 1, filter: 'blur(0px)'}}*/}
                            {/*        transition={{*/}
                            {/*            duration: 0.3,*/}
                            {/*            delay: 1.3,*/}
                            {/*            ease: "easeIn"*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        Creativity.*/}
                            {/*    </motion.span>*/}
                            {/*    <motion.span*/}
                            {/*        className=""*/}
                            {/*        initial={{opacity: 0, filter: 'blur(3px)'}}*/}
                            {/*        animate={{opacity: 1, filter: 'blur(0px)'}}*/}
                            {/*        transition={{*/}
                            {/*            duration: 0.3,*/}
                            {/*            delay: 1.6,*/}
                            {/*            ease: "easeIn"*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        Design.*/}
                            {/*    </motion.span>*/}
                            {/*    <motion.span*/}
                            {/*        className=""*/}
                            {/*        initial={{opacity: 0, filter: 'blur(3px)'}}*/}
                            {/*        animate={{opacity: 1, filter: 'blur(0px)'}}*/}
                            {/*        transition={{*/}
                            {/*            duration: 0.3,*/}
                            {/*            delay: 1.9,*/}
                            {/*            ease: "easeIn"*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        Execution.*/}
                            {/*    </motion.span>*/}
                            {/*</h1>*/}
                            <motion.div
                                className="py-2 xl:py-8 font-outfit
                                    text-sm md:text-xl lg:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl"
                                initial={{opacity: 0, y: 40}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.0,
                                    ease: "easeOut"
                                }}
                            >
                                <p className="">
                                    Joo Eon Park is a South Korean artist, designer, and software engineer
                                    with a passion for creativity, integrating his interdisciplinary expertise
                                    in design and technology to build platforms for creative expression.
                                </p>
                                <p className="mt-4">
                                    With diverse backgrounds in Computer Science, Digital Media, and Studio Art,
                                    Park blends his multifaceted expertise to create experiences that are both highly
                                    functional and visually engaging. In pursuit of limitless creativity, attentive design,
                                    and flawless execution in his work, he brings a perspective that integrates the minds
                                    of artists, designers, and technicians alike.
                                </p>
                                <p className="mt-4">
                                    Park offers professional skills and knowledge in Full-Stack Web Development,
                                    Human-Computer Interaction, Graphic Design, UI/UX, and Visual Arts.
                                </p>
                            </motion.div>
                        </section>
                        {/*<section className="flex flex-col gap-14 sm:gap-20 px-7 pb-20 mt-60 h-fit">*/}
                        {/*    /!* About text *!/*/}
                        {/*    <motion.div*/}
                        {/*        className="xl:w-2/3 text-xl md:text-3xl lg:text-3xl 2xl:text-8xl font-outfit font-semibold"*/}
                        {/*        initial={{opacity: 0}}*/}
                        {/*        animate={{opacity: 1}}*/}
                        {/*        transition={{*/}
                        {/*            duration: 0.3,*/}
                        {/*            delay: 3.0,*/}
                        {/*            ease: "easeIn"*/}
                        {/*        }}*/}
                        {/*    >*/}
                        {/*        <h2 className="text-customGray mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-lg lowercase">*/}
                        {/*            [ About ]*/}
                        {/*        </h2>*/}
                        {/*        <ScrollText*/}
                        {/*            paragraph={"in pursuit of limitless creativity, meticulous design, and flawless execution."}/>*/}
                        {/*    </motion.div>*/}
                        {/*</section>*/}
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default About;
