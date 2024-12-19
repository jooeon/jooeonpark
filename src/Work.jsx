import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";

const Work = () => {

    return (
        <>
            <Header/>
            <main>
                <section className="flex p-7">
                    <div className="p-7">
                        <div className="w-full">
                            <video
                                autoPlay
                                muted
                                loop
                            >
                                <source src="src/videos/steps_white_on_black.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <motion.div
                            className="my-6 md:my-0 md:py-5"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                                ease: "linear"
                            }}
                        >
                            <h2 className="text-6xl uppercase">11,182,156 Steps</h2>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Work;
