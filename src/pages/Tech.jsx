import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {motion, useScroll} from "framer-motion";
import EncryptionText from "../components/EncryptionAnim.jsx";
import AsciiAnimation from "../components/AsciiAnim.jsx";
import ParallaxText from "../components/ParallaxText.jsx";
import { isMobile } from "react-device-detect";
import {Link} from "react-router-dom";
import {MaskText} from "../components/MaskText.jsx";
import {useLenis} from "lenis/react";
import {useEffect} from "react";
import {scrollToTop} from "../Utils.jsx";

const Tech = () => {

    // for checking if WebGL is compatible to browser
    // return true if
    const checkWebGL = () => {
        try {
            const canvas = document.createElement("canvas");
            return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
        } catch {
            return false;
        }
    };

    // get absolute scroll position in pixels
    const { scrollY } = useScroll();

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    return (
        <>
            <Header/>
            <main>
                <motion.div
                    className="pt-10 pl-5 md:pt-20 md:pl-10 4xl:pt-36 7xl:pt-40"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{
                        duration: 0.3,
                        delay: 0.6,
                        ease: "easeOut"
                    }}
                >
                    <h1 className="title-text font-nick uppercase text-[5vw] leading-none">
                        <MaskText phrase={"Technical"} duration={1} delay={0.8}/>
                    </h1>
                </motion.div>
                <section className="relative flex flex-col gap-16 md:gap-28 lg:gap-36 pt-10 md:pt-20">
                    {/* 3D animation */}
                    {!isMobile && checkWebGL() && <AsciiAnimation/>}
                    <div className="xl:w-7/12 px-5 xl:px-7 6xl:px-14
                        text-xs md:text-base lg:text-xl 3xl:text-2xl 4xl:text-3xl 5xl:text-4xl 7xl:text-6xl">
                        <h2 className="uppercase font-neueHaasGrotesk font-extrabold mb-5 5xl:mb-14 7xl:mb-24 min-h-7 md:min-h-9 xl:min-h-10">
                            <EncryptionText
                                text={"Skills"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <div className="flex flex-col gap-10 w-full xl:px-5
                            [&_caption]:w-fit [&_caption]:mb-2 [&_caption]:7xl:mb-10 [&_caption]:text-start [&_caption]:font-extrabold
                            [&_tr]:border-b [&_tr]:text-customGray [&_tr]:border-customGrayLight [&_tr]:dark:border-customBlackLight
                            [&_td]:pt-2 [&_td]:pb-1 [&_td]:7xl:pb-12 [&_td]:pl-3 [&_td]:md:pl-5 [&_td]:relative
                            [&_td]:text-2xs [&_td]:md:text-sm [&_td]:lg:text-lg [&_td]:3xl:text-xl [&_td]:4xl:text-2xl [&_td]:5xl:text-3xl [&_td]:7xl:text-5xl">
                            <motion.table
                                className="table-fixed w-full"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.2,
                                    ease: "easeOut"
                                }}>
                                <caption>Development</caption>
                                <tbody>
                                    <tr>
                                        <td>Full-Stack Web</td>
                                        <td>Responsive Design</td>
                                        <td>HTML/CSS</td>
                                        <td>JavaScript</td>
                                    </tr>
                                    <tr>
                                        <td>Accessibility</td>
                                        <td>Web Animations</td>
                                        <td>Mobile App</td>
                                        <td>CMS</td>
                                    </tr>
                                </tbody>
                            </motion.table>
                            <motion.table
                                className="table-fixed w-full"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.4,
                                    ease: "easeOut"
                                }}
                            >
                                <caption>UI/UX & Design</caption>
                                <tbody>
                                    <tr>
                                        <td>Figma</td>
                                        <td>Adobe Illustrator</td>
                                        <td>Adobe Photoshop</td>
                                        <td>Graphic Design</td>
                                    </tr>
                                    <tr>
                                        <td>Needfinding</td>
                                        <td>Prototyping</td>
                                        <td>Usability Testing</td>
                                        <td>User Research</td>
                                    </tr>
                                </tbody>
                            </motion.table>
                            <motion.table
                                className="table-fixed w-full"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.6,
                                    ease: "easeOut"
                                }}
                            >
                                <caption>Back-end & Technical</caption>
                                <tbody>
                                    <tr>
                                        <td>Data Structures</td>
                                        <td>Algorithms</td>
                                        <td>OOP</td>
                                        <td>Git</td>
                                    </tr>
                                    <tr>
                                        <td>Code Readability</td>
                                        <td>Databases</td>
                                        <td>Java</td>
                                        <td>Linux</td>
                                    </tr>
                                </tbody>
                            </motion.table>
                        </div>
                    </div>
                    {/* Tech stack parallax text */}
                    <div>
                        <h2 className="uppercase font-neueHaasGrotesk font-extrabold px-5 xl:px-7 6xl:px-14 mb-5 5xl:mb-14 7xl:mb-24 min-h-7 md:min-h-9 xl:min-h-10
                            text-xs md:text-base lg:text-xl 5xl:text-4xl 7xl:text-6xl">
                            <EncryptionText
                                text={"Tech Stack & Software"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <motion.div
                            className="w-full flex overflow-hidden items-center uppercase font-nick
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl 5xl:text-8xl 7xl:text-10xl"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                delay: 1.8,
                                ease: "easeOut"
                            }}
                        >
                            <ParallaxText
                                textArray={["react", "next.js", "tailwind", "framer motion", "sql", "android", "adobe cc", "figma"]}
                                baseVelocity={isMobile ? 50 : 100}
                                scrollY={scrollY}
                            />
                        </motion.div>
                    </div>
                    {/* Connect text */}
                    <div className="px-5 xl:px-7 6xl:px-14 mb-10 md:mb-20
                        text-xs md:text-base lg:text-xl 5xl:text-4xl 7xl:text-6xl">
                        <h2 className="uppercase font-neueHaasGrotesk font-extrabold mb-5 5xl:mb-14 7xl:mb-24 min-h-7 md:min-h-9 xl:min-h-10">
                            <EncryptionText
                                text={"Connect"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <motion.div
                            className="flex gap-10 md:gap-20 xl:px-5 text-customGray"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.5,
                                delay: 2.0,
                                ease: "easeOut"
                            }}
                        >
                            <Link to="https://www.linkedin.com/in/joo-eon-park/" target="_blank" rel="noopener noreferrer"
                                  className="text-link after:bg-customBlack dark:after:bg-customWhite">
                                LinkedIn
                            </Link>
                            <Link to="https://github.com/jooeon" target="_blank" rel="noopener noreferrer"
                                  className="text-link after:bg-customBlack dark:after:bg-customWhite">
                                GitHub
                            </Link>
                            <Link to="mailto:jooeon427@gmail.com" target="_blank" rel="noopener noreferrer"
                                  className="text-link after:bg-customBlack dark:after:bg-customWhite">
                                Email
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Tech;
