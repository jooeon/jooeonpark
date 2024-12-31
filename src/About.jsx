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
                        className="flex flex-col justify-center xl:h-screen xl:w-50vw px-10 md:px-12 lg:px-16 xl:pl-10 xl:pr-40">
                        <h1 className="flex flex-col gap-2 xl:gap-4 xl:flex-row text-4xl md:text-6xl uppercase font-raleway font-bold">
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.3,
                                    ease: "easeIn"
                                }}
                            >
                                Creativity.{' '}
                            </motion.span>
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.6,
                                    ease: "easeIn"
                                }}
                            >
                                Design.{' '}
                            </motion.span>
                            <motion.span
                                className=""
                                initial={{opacity: 0, filter: 'blur(3px)'}}
                                animate={{opacity: 1, filter: 'blur(0px)'}}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.9,
                                    ease: "easeIn"
                                }}
                            >
                                Execution.
                            </motion.span>
                        </h1>
                        <motion.div
                            className="py-6 xl:py-8 text-2xl md:text-35px leading-snug text-customGray"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 1.4,
                                ease: "easeIn"
                            }}
                        >
                            <p className="">
                                Joo Eon Park is a South Korean artist, designer, and software engineer
                                pursuing endless creativity, attentive design, and precise execution through his
                                interdisciplinary work in design and technology.
                            </p>
                            <p className="mt-4">
                                With diverse backgrounds in Computer Science, Digital Media, and Visual Art,
                                Park blends his multifaceted expertise to create experiences that are both highly
                                functional and visually engaging.
                            </p>
                        </motion.div>
                    </section>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default About;
