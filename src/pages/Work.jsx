import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {MaskText} from "../components/textEffects/MaskText.jsx";
import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import EncryptionText from "../components/EncryptionAnim.jsx";
import {useLenis} from "lenis/react";
import {scrollToTop} from "../Utils.jsx";
import {useEffect} from "react";
import TitleText from "../components/templates/TitleText.jsx";

const Work = () => {

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main>
                <section>
                    <TitleText phrase={"Projects"} />
                    <div className="w-full px-4 md:px-6 xl:px-10 mt-20 xl:mt-32 font-neueHaasGrotesk font-bold lowercase
                        flex flex-col justify-start items-center">
                        <motion.div
                            className="w-full xl:w-1/2"
                            initial={{opacity: 0, y: 70}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.6,
                                delay: 1.1,
                                ease: "easeOut",
                            }}
                        >
                            <div className="">
                                <Link to="/project/atopol" className="w-full">
                                    <img
                                        src="/images/thumbnails/atopol_thumb.jpg"
                                        alt="Allen_Topolski_portfolio_website_image"
                                        loading="lazy"
                                        className="w-full"/>
                                </Link>
                            </div>
                            <div
                                className="flex justify-between w-full mt-2 xl:mt-4
                                    text-3xs md:text-base 3xl:text-lg 5xl:text-2xl 6xl:text-3xl">
                                <p className="">Allen Topolski&apos;s Portfolio</p>
                                <p className="text-customGray">2025</p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex justify-center items-center w-full h-screen text:[1.25vh] xl:text-[1.25vw]"
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            viewport={{once: true, amount: 0.8}}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >
                            <EncryptionText
                                text={"More projects coming soon..."}
                                delay={0.6}
                                duration={0.3}
                                speed={20}
                            />
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
);
};

export default Work;