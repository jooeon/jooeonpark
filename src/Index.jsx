import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion, animate, motionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

const Index = () => {

    const x = motionValue(0)

    useEffect(() => {
        const animation = animate(x, 100, { duration: 10 });

        return animation.stop;
    }, []);

    return (
        <>
            <Header/>
            <main>

                <section className="flex items-center justify-center min-h-30vh m-5">
                    {/*<motion.h1>{x}</motion.h1>*/}
                    <motion.div
                        className="text-4xl text-center w-2/4 h-screen"
                        initial={{y: 0, opacity: 1, width: 100}}
                        animate={{y: 0, opacity: 1, width: 900}}
                        transition={{
                            duration: 1.4,
                            delay: 0.1,
                            ease: [0.5, 1, 0.89, 1] // easeOutQuad
                        }}
                    >
                        <p className="pt-20 text-clip overflow-hidden">
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
            </main>
            <Footer/>
        </>
    );
};

export default Index;
