import Header from "../components/templates/Header.jsx";
import TitleText from "../components/templates/TitleText.jsx";
import {scrollToTop} from "../Utils.jsx";
import {useEffect} from "react";
import {useLenis} from "lenis/react";
import {motion} from "motion/react";
import {Link} from "react-router-dom";
import items from "../data/DesignData.jsx";
import Footer from "../components/templates/Footer.jsx";

const Design = () => {

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main className="flex flex-col min-h-[100vh]">
                <div className="flex flex-col md:flex-row items-baseline gap-[3vw] xl:gap-[2vw]">
                    <TitleText phrase={"Design"}/>
                    <div className="flex gap-[2vw] xl:gap-[1vw] pl-3 md:pl-0
                        leading-none text-[2vh] xl:text-[1vw] font-neueHaasGrotesk font-semibold lowercase">
                        <motion.p
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.35,
                                delay: 1.3,
                                ease: "easeOut",
                            }}
                        >
                            /branding
                        </motion.p>
                        <motion.p
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.35,
                                delay: 1.4,
                                ease: "easeOut",
                            }}
                        >
                            /graphic
                        </motion.p>
                        <motion.p
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.35,
                                delay: 1.5,
                                ease: "easeOut",
                            }}
                        >
                            /motion
                        </motion.p>
                    </div>
                </div>
                <section className="xl:min-h-[70vh] flex-1 mt-[8vh] mb-[2vh] xl:mb-[4vh] p-4 md:p-7 xl:p-8 4xl:p-12 7xl:p-20">
                    <div className="flex flex-wrap justify-center xl:justify-start gap-[10vw] xl:gap-[3.5vw]">
                        {items.map((item, index) => {

                            return (
                                <motion.div
                                    key={item.id}
                                    className="w-[25vw] xl:w-[10vw]"
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 1.4 + index * 0.1,
                                        ease: "easeOut",
                                    }}
                                >
                                    {/* Video/image content */}
                                    <Link to={item.link} className="">
                                        {item.isVideo && (
                                            <video
                                                autoPlay
                                                playsInline
                                                muted
                                                loop
                                                className=""
                                            >
                                                <source src={item.thumbnail} type="video/mp4"/>
                                                Your browser does not support the video tag.
                                            </video>
                                        )}
                                        {!item.isVideo && (
                                            <img
                                                src={item.thumbnail}
                                                alt={`Gallery ${item.id + 1}`}
                                                className=""
                                                loading="lazy"
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>
                <Footer/>
            </main>
        </>
    )

}

export default Design;