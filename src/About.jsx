import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";

const About = () => {

    return (
        <>
            <Header/>
            <main>
                <section className="flex flex-col min-h-30vh p-7">
                    <h1 className="text-6xl uppercase font-raleway font-bold">
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
                            Creativity.{' '}
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
                            Design.{' '}
                        </motion.span>
                        <motion.span
                            className=""
                            initial={{opacity: 0, filter: 'blur(3px)'}}
                            animate={{opacity: 1, filter: 'blur(0px)'}}
                            transition={{
                                duration: 0.3,
                                delay: 1.2,
                                ease: "easeIn"
                            }}
                        >
                            Execution.
                        </motion.span>
                    </h1>
                    <motion.div
                        className="w-11/12 md:w-3/4"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.3,
                            delay: 1.5,
                            ease: "easeIn"
                        }}
                    >
                        <p className="py-6 md:py-8 text-35px leading-snug uppercase">
                            Joo Eon Park is an artist, designer, and software engineer in the interdisciplinary world of digital media, where art and design meet technology.
                        </p>
                    </motion.div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default About;
