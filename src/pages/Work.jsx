import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion} from "motion/react";
import {Link} from "react-router-dom";
import {useLenis} from "lenis/react";
import {scrollToTop} from "../Utils.jsx";
import {useEffect, useState} from "react";
import TitleText from "../components/templates/TitleText.jsx";
import EncryptionText from "../components/EncryptionAnim.jsx";
import {items} from "../data/WorkData.jsx";
import {MaskText} from "../components/textEffects/MaskText.jsx";

const Work = () => {
    const isVideo = (src) => /\.(mp4|webm|ogg|mov)$/i.test(src);
    const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);

    // Mark as initially loaded after the container animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitiallyLoaded(true)
        }, 1500) // Container delay (1.1s) + some buffer

        return () => clearTimeout(timer)
    }, [])

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main>
                <div className="flex flex-col md:flex-row items-baseline gap-[3vw] xl:gap-[2vw]">
                    <TitleText phrase={"Work"}/>
                    <div className="flex gap-[2vw] xl:gap-[1vw] pl-3 md:pl-0
                        leading-none text-fluid-sm font-neueHaasGrotesk font-semibold lowercase">
                        <motion.p
                            initial={{opacity: 0, y: 15}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.35,
                                delay: 1.3,
                                ease: "easeOut",
                            }}
                        >
                            /Web
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
                            /dev
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
                            /design
                        </motion.p>
                    </div>
                </div>
                <section
                    className="flex flex-col items-center px-4 md:px-7 6xl:px-12 7xl:px-14 mt-[8vh] lg:mt-[7vh] xl:mt-[8vw] font-neueHaasGrotesk font-semibold lowercase">
                        {items.map((item, projId) => (
                            <div key={projId} className="">
                                <div
                                    className="text-fluid-xl font-bold [&_.mask-box]:justify-end"
                                >
                                    <MaskText phrase={"/"+String(projId + 1).padStart(2, '0')} duration={1} delay={hasInitiallyLoaded ? projId + 0.6 : projId + 1.9}/>
                                </div>
                                <div className="grid work-grid gap-4 md:gap-6 xl:gap-[2dvw] mt-2 md:mt-4 mb-[10dvh] md:mb-[14dvh] xl:mb-[20dvh]">
                                    {item.thumbnails.map((thumb, thumdex) => {
                                        const staggerOrder = [0, 2, 1, 3];
                                        const delayIndex = staggerOrder.indexOf(thumdex);
                                        return (
                                            <motion.div
                                                key={thumdex}
                                                className={thumdex === 0 ? "col-span-12 xl:col-span-6" : thumdex === 2 ? "hidden xl:block xl:col-span-5 xl:col-start-12" : thumdex === 1 ? "col-span-8 xl:col-span-4" : "hidden xl:block xl:col-span-4"}
                                                initial={{opacity: 0, y: 30}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{
                                                    delay: hasInitiallyLoaded ? projId + delayIndex * 0.1 : projId + 1.3 + delayIndex * 0.1,
                                                    duration: 0.5,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                <Link
                                                    to={item.link}
                                                >
                                                    {isVideo(thumb)
                                                        ? <video autoPlay playsInline muted loop className="w-full">
                                                            <source src={thumb} type="video/mp4"/>
                                                        </video>
                                                        : <img src={thumb} loading="lazy" className="w-full"/>
                                                    }
                                                    <motion.div
                                                        className="text-fluid-xxs md:text-fluid-sm mt-3"
                                                        initial={{opacity: 0, y: 15}}
                                                        animate={{opacity: 1, y: 0}}
                                                        transition={{
                                                            delay: hasInitiallyLoaded ? projId + 0.2 + delayIndex * 0.1 : projId + 1.5 + delayIndex * 0.1,
                                                            duration: 0.5,
                                                            ease: "easeOut",
                                                        }}
                                                    >
                                                        {(() => {
                                                            if (thumdex === 1) return <p>{item.caption[0]}</p>
                                                            if (thumdex === 3) return <p>{item.caption[3]}</p>
                                                        })()}
                                                    </motion.div>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    {/*<motion.div*/}
                    {/*    className="flex justify-center items-center w-full h-screen text-fluid-base*/}
                    {/*    font-neueHaasGrotesk font-bold lowercase"*/}
                    {/*    initial={{opacity: 0}}*/}
                    {/*    whileInView={{opacity: 1}}*/}
                    {/*    viewport={{once: true, amount: 0.8}}*/}
                    {/*    transition={{*/}
                    {/*        duration: 0.6,*/}
                    {/*        ease: "easeInOut",*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <EncryptionText*/}
                    {/*        text={"More projects coming soon..."}*/}
                    {/*        delay={0.6}*/}
                    {/*        duration={0.3}*/}
                    {/*        speed={20}*/}
                    {/*    />*/}
                    {/*</motion.div>*/}
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Work;