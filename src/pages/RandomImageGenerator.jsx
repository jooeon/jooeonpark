import RandomImageHalftone from "../components/RandomImageHalftone.jsx";
import TitleText from "../components/templates/TitleText.jsx";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion} from "framer-motion";

const RandomImageGenerator = () => {
    return (
        <>
            <Header/>
            <div className="flex items-baseline gap-[3vw] xl:gap-[2vw]">
                <TitleText phrase={"R.I.G."}/>
                <motion.p
                    className="leading-none text-[2vh] xl:text-[1vw] font-neueHaasGrotesk font-semibold lowercase"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
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
                <RandomImageHalftone/>
            </section>
            <Footer/>
        </>
    )
}

export default RandomImageGenerator;