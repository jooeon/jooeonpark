import Header from "../components/templates/Header.jsx";
import TitleText from "../components/templates/TitleText.jsx";
import {scrollToTop} from "../Utils.jsx";
import {useEffect} from "react";
import {useLenis} from "lenis/react";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import items from "../data/DesignData.jsx";

const Design = () => {

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main>
                <div className="flex items-baseline gap-[3vw] xl:gap-[2vw]">
                    <TitleText phrase={"Design"}/>
                    <div className="flex gap-[2vw] xl:gap-[1vw]">
                        <motion.p
                            className="leading-none text-[2vh] xl:text-[1vw] font-neueHaasGrotesk font-semibold lowercase"
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.35,
                                delay: 1.3,
                                ease: "easeOut",
                            }}
                        >
                            /graphic
                        </motion.p>
                        <motion.p
                            className="leading-none text-[2vh] xl:text-[1vw] font-neueHaasGrotesk font-semibold lowercase"
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
                <section className="mt-[8vh] mb-[2vh] xl:mb-[4vh] p-4 md:p-7 xl:p-8 4xl:p-12 7xl:p-20">
                    <div className="flex flex-wrap justify-center xl:justify-start gap-[10vw] xl:gap-[3.5vw]">
                        {items.map((item) => {
                            const animationProps = item.hasAnimation
                                ? {
                                    initial: {opacity: 0, y: 70},
                                    whileInView: {opacity: 1, y: 0},
                                    viewport: {once: true},
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.7 + item.animationDelay,
                                        ease: "easeOut",
                                    },
                                }
                                : {};

                            return (
                                <motion.div
                                    key={item.id}
                                    className="w-[25vw] xl:w-[10vw]"
                                    {...animationProps}
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
            </main>
        </>
    )

}

export default Design;