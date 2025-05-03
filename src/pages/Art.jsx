import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { motion } from "framer-motion";
import {items} from "../data/ArtData.jsx";
import {isMobile} from "react-device-detect";
import HorizontalScrollSection from '../components/HorizontalScrollSection.jsx';

const Art = () => {

    return (
        <>
            <Header/>
            <main className="">
                {!isMobile && <section className="relative flex justify-center items-center p-7 h-[60vh]">
                    <h1 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center leading-none uppercase font-nick
                        text-[3vw]">
                        Creative Works
                    </h1>
                    <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                        *:border-customGrayLight *:dark:border-customBlackLight">
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className=""></div>
                    </div>
                </section>}
                {/* Use horizontal scroll only on desktop, since it is awkward on touch screens */}
                {!isMobile ?
                    <section className="relative flex justify-center items-center w-full">
                        <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                            *:border-customGrayLight *:dark:border-customBlackLight">
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className=""></div>
                        </div>
                        <HorizontalScrollSection gap={20}>
                            {items.map((item) => {
                                const animationProps = item.hasAnimation
                                    ? {
                                        initial: {opacity: 0, y: 70},
                                        whileInView: {opacity: 1, y: 0},
                                        viewport: {once: true},
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.7,
                                            ease: "easeInOut",
                                        },
                                    }
                                    : {};

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="flex flex-col"
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
                                            {/* Bottom captions */}
                                            <div className="flex justify-between gap-10 pt-1 font-almarai font-bold lowercase text-sm">
                                                {item.caption && (
                                                    <>
                                                        {/* Bottom-Left Caption */}
                                                        {item.caption[0] && (
                                                            <p className="">
                                                                {item.caption[0]}
                                                            </p>
                                                        )}

                                                        {/* Bottom-Right Caption */}
                                                        {item.caption[3] && (
                                                            <p className="text-customGray">
                                                                {item.caption[3]}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </HorizontalScrollSection>
                    </section>
                    :
                    <motion.div
                        className="pt-10 pl-5 md:pt-20 md:pl-10 pb-2 md:pb-10"
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.3,
                            delay: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        <h1 className="title-text font-nick uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl 4xl:text-9xl">Creative Works</h1>
                    </motion.div>
                }
                {isMobile && <section className="flex flex-row flex-wrap justify-between gap-5
                    h-min w-full xl:w-11/12 p-5 mx-auto uppercase">
                    {items.map((item) => (
                        <div className={`flex flex-col w-full h-full xl:w-2/5 xl:h-2/5 ${item.padding}`}
                             key={item.id}>
                            <motion.div
                                className=""
                                initial={{y: 150, opacity: 0}}
                                whileInView={{y: 0, opacity: 1}}
                                viewport={{once: true, amount: 0.1}}
                                transition={{
                                    duration: 0.9,
                                    delay: 0,
                                    ease: "easeInOut"
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
                                            className="w-full py-3"
                                        >
                                            <source src={item.thumbnail} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {!item.isVideo && (
                                        <img
                                            src={item.thumbnail}
                                            alt={item.alt}
                                            loading="lazy" // Adds lazy loading for performance
                                            className="w-full aspect-square md:aspect-auto object-cover py-3"
                                        />
                                    )}
                                </Link>
                                {/* Bottom captions */}
                                <div className="flex justify-between gap-10 font-almarai font-bold lowercase">
                                    {item.caption && (
                                        <>
                                            {/* Bottom-Left Caption */}
                                            {item.caption[0] && (
                                                <p className="">
                                                    {item.caption[0]}
                                                </p>
                                            )}

                                            {/* Bottom-Right Caption */}
                                            {item.caption[3] && (
                                                <p className="text-customGray">
                                                    {item.caption[3]}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                        ))}
                </section>
                }
            </main>
            <div className="hidden"><Footer/></div>
        </>
    );
};

export default Art;
