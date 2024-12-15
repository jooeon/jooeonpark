import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion, animate, motionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Index = () => {

    const count = motionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, 100, { duration: 1.0 });

        return animation.stop;
    }, []);

    return (
        <>
            <Header/>
            <main>
                <motion.div
                    className="fixed flex justify-center items-center top-0 pointer-events-none h-screen w-full bg-red-700 z-10 text-8xl"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.2,
                        delay: 1.5,
                        ease: "linear"
                    }}
                >
                    {rounded}
                </motion.div>
                <section className="flex items-center justify-center min-h-30vh m-5">
                    <motion.div
                        className="text-4xl text-center w-2/4"
                        initial={{y: 0, opacity: 1, width: 100, height: 440}}
                        animate={{y: 0, opacity: 1, width: 900, height: 440}}
                        transition={{
                            duration: 1.5,
                            delay: 1.6,
                            ease: [0.5, 1, 0.89, 1] // easeOutQuad
                        }}
                    >
                        <p className="py-40 text-clip overflow-hidden">
                            Artist, designer, and engineer in the interdisciplinary world of digital media, where art and design meet technology.
                        </p>
                    </motion.div>
                    {/*<motion.h1*/}
                    {/*    className="absolute text-[18vw] font-bold text-center leading-snug"*/}
                    {/*    initial={{y: 1000}}*/}
                    {/*    animate={{y: -1200}}*/}
                    {/*    transition={{*/}
                    {/*        duration: 4.0,*/}
                    {/*        delay: 0.2,*/}
                    {/*        ease: "linear"*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    ARTIST. DESIGNER. ENGINEER.*/}
                    {/*</motion.h1>*/}
                </section>
                <section className="flex justify-center h-screen w-full p-5">
                    <motion.div
                        className="w-1/2 bg-customWhite m-5"
                        initial={{y: 300, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 1.2,
                            delay: 1.8,
                            ease: [0.42, 0, 0.58, 1]    // custom easeInOut
                        }}
                    >
                    </motion.div>
                    <motion.div
                        className="w-1/2 bg-customWhite m-5"
                        initial={{y: 300, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{
                            duration: 1.2,
                            delay: 2.1,
                            ease: [0.42, 0, 0.58, 1]    // custom easeInOut
                        }}
                    >
                    </motion.div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Index;
