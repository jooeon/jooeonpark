import { Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";
import {items} from "./Data.jsx";
import {isMobile} from "react-device-detect";
import HorizontalScrollSection from './components/HorizontalScrollSection.jsx';

const Art = () => {

    return (
        <>
            <Header/>
            <main className="pt-16 xl:pt-20">
                <section className="relative flex justify-center items-center p-7 h-screen">
                    <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                        *:border-customGrayLight *:dark:border-customBlackLight">
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className=""></div>
                    </div>
                </section>
                {/* if not mobile, use horizontal scroll since it is awkward on touch screens */}
                {!isMobile ?
                    <section className="relative flex justify-center items-center uppercase font-raleway">
                        <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                        *:border-customGrayLight *:dark:border-customBlackLight">
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className=""></div>
                        </div>
                        <HorizontalScrollSection itemWidth={500} gap={20}>
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className="flex flex-col"
                                    initial={{opacity: 0}}
                                    whileInView={{opacity: 1}}
                                    viewport={{amount: 0.2, once: true}}
                                    transition={{
                                        duration: 1.0,
                                        ease: "easeIn",
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
                                        {/* Bottom captions */}
                                        <div className="flex justify-between pt-2">
                                            {item.caption && (
                                                <>
                                                    {/* Bottom-Left Caption */}
                                                    {item.caption[0] && (
                                                        <p className="text-customBlack dark:text-customWhite">
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
                            ))}
                        </HorizontalScrollSection>
                    </section>
                :
                    <section className="flex flex-row flex-wrap justify-between gap-5
                        h-min w-full xl:w-11/12 mx-auto p-5 uppercase">
                        {items.map((item) => (
                            <div className={`flex flex-col w-full h-full xl:w-2/5 xl:h-2/5 ${item.padding}`} key={item.id} >
                                <motion.div
                                    className="art-image"
                                    initial={{ y: 150, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{
                                        duration: 0.9,
                                        delay: 0,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* Top captions */}
                                    <div className="flex justify-between">
                                        {item.caption && (
                                            <>
                                                {/* Top-Left Caption */}
                                                {item.caption[0] && (
                                                    <p className="text-customBlack dark:text-customWhite">
                                                        {item.caption[0]}
                                                    </p>
                                                )}

                                                {/* Top-Right Caption */}
                                                {item.caption[1] && (
                                                    <p className="text-customGray">
                                                        {item.caption[1]}
                                                    </p>
                                                )}
                                            </>
                                        )}
                                    </div>
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
                                    <div className="flex justify-between">
                                    {item.caption && (
                                        <>
                                            {/* Bottom-Left Caption */}
                                            {item.caption[2] && (
                                                <p className="text-customGray">
                                                    {item.caption[2]}
                                                </p>
                                            )}

                                            {/* Bottom-Right Caption */}
                                            {item.caption[3] && (
                                                <p className="text-customBlack dark:text-customWhite">
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
            <Footer/>
        </>
);
};

export default Art;
