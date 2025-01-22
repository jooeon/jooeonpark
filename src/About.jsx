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
            <Header isVisible={true}/>
            <main>
                <div className="flex flex-col xl:flex-row">
                    <section className="flex justify-center items-center xl:h-screen xl:w-50vw
                        py-14 md:py-24 lg:py-32 xl:py-0">
                        <motion.div className="w-3/4 xl:w-1/2 xl:min-w-96 border border-customBlackLight">
                            <img
                                src={isDarkMode ? "/images/profile.jpg" : "/images/profile_bw.jpg"}
                                alt="Joo Eon Park Profile Image"
                                loading="lazy" // Adds lazy loading for performance
                            />
                        </motion.div>
                    </section>
                    <section
                        className="flex flex-col justify-center xl:h-screen xl:w-50vw px-8 md:px-12 lg:px-16 xl:pl-10 xl:pr-40">
                        <h1 className="title-text flex flex-col gap-2 xl:gap-4 xl:flex-row text-4xl lg:text-5xl xl:text-4xl 2xl:text-5xl uppercase font-poppins font-bold">
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.3,
                                    ease: "easeIn"
                                }}
                            >
                                Creativity.
                            </motion.span>
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.6,
                                    ease: "easeIn"
                                }}
                            >
                                Design.
                            </motion.span>
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.9,
                                    ease: "easeIn"
                                }}
                            >
                                Execution.
                            </motion.span>
                        </h1>
                        <motion.div
                            className="py-6 xl:py-8 text-sm md:text-xl font-poppins font-medium text-customGray"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 2.4,
                                ease: "easeIn"
                            }}
                        >
                            <p className="">
                                Joo Eon Park is a South Korean artist, designer, and software engineer
                                with a passion for design and creation, integrating his interdisciplinary expertise
                                in design and technology to build platforms for creative expression.
                            </p>
                            <p className="mt-4">
                                With diverse backgrounds in Computer Science, Digital Media, and Studio Art,
                                he blends his multifaceted expertise to create experiences that are both highly
                                functional and visually engaging. In pursuit of limitless creativity, attentive design,
                                and flawless execution in his work, Park brings a perspective that integrates the minds
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
            </main>
            <Footer/>
        </>
    );
};

export default About;
