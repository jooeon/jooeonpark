import RandomImageHalftone from "../components/RandomImageHalftone.jsx";
import TitleText from "../components/templates/TitleText.jsx";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion} from "motion/react";
import {checkWebGL} from "../Utils.jsx";
import {Link} from "react-router-dom";

const RandomImageGenerator = () => {
    return (
        <>
            <Header/>
            <div className="flex items-baseline gap-[3vw] xl:gap-[2vw]">
                <TitleText phrase={"R.I.G."}/>
                <motion.p
                    className="leading-none text-fluid-sm font-neueHaasGrotesk font-semibold lowercase"
                    initial={{opacity: 0, y: 15}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.35,
                        delay: 1.3,
                        ease: "easeOut",
                    }}
                >
                    /Random Image Generator
                </motion.p>
            </div>
            <section className="my-[5vh] lg:my-[6vh] xl:my-[6vw] p-3 md:p-3.5 xl:p-3.5 4xl:p-8 7xl:p-10">
                {checkWebGL() ? (
                    <RandomImageHalftone/>
                ) : (
                    <div className="flex flex-col justify-center items-center gap-[1.5vh] h-[65vh] xl:h-[50vh]
                        font-neueHaasGrotesk font-bold text-fluid-base text-center">
                        <p>WebGL failed to load on your browser.</p>
                        <p className="w-2/3 text-fluid-sm opacity-80">Try a different browser or restart your
                            current browser.</p>
                    </div>
                )}
            </section>
            <section
                className="flex justify-end m-2 md:m-5 mt-10 md:mt-20 font-neueHaasGrotesk font-extrabold uppercase">
                <div className="flex items-end pr-2
                            text-3xs sm:text-2xs md:text-sm lg:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">
                    <Link to="/art" className="text-link after:bg-customBlack dark:after:bg-customWhite">Back to Gallery</Link>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default RandomImageGenerator;