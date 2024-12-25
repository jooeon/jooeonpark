import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";

const About = () => {

    return (
        <>
            <Header/>
            <main>
                <div className="sticky top-0 flex flex-col xl:flex-row">
                    <section className="flex justify-center items-center xl:h-screen xl:w-50vw
                        py-14 md:py-24 lg:py-32 xl:py-0">
                        {/*<div className="hidden xl:block xl:fixed xl:top-0 xl:left-0 bg-customBlack xl:h-screen xl:w-50vw -z-10"></div>*/}
                        <motion.div className="w-3/4 xl:w-1/2 xl:min-w-96 border-4 border-customNavyLight">
                            <img
                                src="/images/profile_bw.png"
                                alt="Joo Eon Park Profile Image"
                                loading="lazy" // Adds lazy loading for performance
                            />
                        </motion.div>
                    </section>
                    <section className="flex flex-col p-9 lg:p-14 xl:px-24 xl:py-32 xl:h-screen xl:w-50vw">
                        <h1 className="text-5xl md:text-6xl uppercase font-raleway font-bold">
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
                            className=""
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.3,
                                delay: 1.4,
                                ease: "easeIn"
                            }}
                        >
                            <p className="py-6 xl:py-8 text-2xl md:text-35px leading-snug">
                                Joo Eon Park is an artist, designer, and software engineer in the interdisciplinary world of digital media, where art and design meet technology.
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
