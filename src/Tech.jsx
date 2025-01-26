import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import {motion, useScroll} from "framer-motion";
import EncryptionText from "./components/EncryptionAnim.jsx";
import AsciiAnimation from "./components/AsciiAnim.jsx";
import ParallaxText from "./components/ParallaxText.jsx";
import { isMobile } from "react-device-detect";
import {Link} from "react-router-dom";

const Tech = () => {

    // get absolute scroll position in pixels
    const { scrollY } = useScroll();

    return (
        <>
            <Header isVisible={true}/>
            <main>
                <motion.div
                    className="pl-5 pt-10 md:pt-20 md:pl-10"
                    initial={{opacity: 0, y: 40}}
                    animate={{opacity: 1, y: 0}}
                    transition={{
                        duration: 0.3,
                        delay: 0.6,
                        ease: "easeOut"
                    }}
                >
                    <h1 className="title-text font-nick uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl 4xl:text-9xl">Technical</h1>
                </motion.div>
                <section className="relative flex flex-col gap-16 md:gap-28 lg:gap-36 pt-10">
                    {/* 3D animation */}
                    {!isMobile && <AsciiAnimation/>}
                    {/* About text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl px-5 xl:px-7">
                        <h2 className="uppercase font-bold mb-5 min-h-7 md:min-h-9 xl:min-h-10
                            text-xs md:text-base lg:text-xl">
                            <EncryptionText
                                text={"Skills"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <div className="flex flex-col gap-10 w-full xl:px-5 text-xs md:text-base lg:text-xl
                            [&_caption]:w-fit [&_caption]:mb-2 [&_caption]:text-start [&_caption]:font-medium
                            [&_tr]:border-b [&_tr]:text-customGray [&_tr]:border-customGrayLight [&_tr]:dark:border-customBlackLight
                            [&_td]:pt-2 [&_td]:pb-1 [&_td]:pl-3 [&_td]:md:pl-5 [&_td]:relative">
                            <table className="table-fixed w-full xl:w-5/6">
                                <caption className="">Web Development</caption>
                                <tbody>
                                    <tr>
                                        <td>Full-Stack</td>
                                        <td>Web Design</td>
                                        <td>Semantics & Accessibility</td>
                                        <td>HTML/CSS</td>
                                    </tr>
                                    <tr>
                                        <td>JavaScript</td>
                                        <td>Frameworks & Libraries</td>
                                        <td>Web Animations</td>
                                        <td>CMS</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table-fixed w-full xl:w-5/6">
                                <caption className="">UI/UX & Design</caption>
                                <tbody>
                                    <tr>
                                        <td>Graphic Design</td>
                                        <td>Adobe Illustrator</td>
                                        <td>Adobe Photoshop</td>
                                        <td>Figma</td>
                                    </tr>
                                    <tr>
                                        <td>Needfinding</td>
                                        <td>Prototyping</td>
                                        <td>Usability Testing</td>
                                        <td>User Study</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table className="table-fixed w-full xl:w-5/6">
                                <caption className="">Back-end & Technical</caption>
                                <tbody>
                                    <tr>
                                        <td>PHP</td>
                                        <td>JSP</td>
                                        <td>Git</td>
                                        <td>Linux</td>
                                    </tr>
                                    <tr>
                                        <td>Databases</td>
                                        <td>Networks</td>
                                        <td>Hardware</td>
                                        <td>Security</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Tech stack parallax text */}
                    <div className="">
                        <h2 className="font-bold uppercase px-5 xl:px-7 mb-5 min-h-7 md:min-h-9 xl:min-h-10
                            text-xs md:text-base lg:text-xl">
                            <EncryptionText
                                text={"Tech Stack & Software"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <div className="w-full flex overflow-hidden items-center uppercase font-nick
                            text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl
                            ">
                            <ParallaxText
                                textArray={["react", "next.js", "tailwind", "framer motion", "sql", "prisma", "adobe cc", "figma"]}
                                baseVelocity={isMobile ? 50 : 100}
                                scrollY={scrollY}
                            />
                        </div>
                    </div>
                    {/* Connect text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl px-5 xl:px-7">
                        <h2 className="uppercase font-bold mb-5 min-h-7 md:min-h-9 xl:min-h-10
                            text-xs md:text-base lg:text-xl">
                            <EncryptionText
                                text={"Connect"}
                                delay={0.4}
                                duration={0.3}
                                speed={20}
                            />
                        </h2>
                        <div className="flex gap-10 md:gap-20 xl:px-5 font-light font-outfit">
                            <Link to="https://www.linkedin.com/in/joo-eon-park/" target="_blank"
                                  className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                LinkedIn
                            </Link>
                            <Link to="https://github.com/jooeon" target="_blank"
                                  className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                GitHub
                            </Link>
                            <Link to="mailto:jooeon427@gmail.com" target="_blank"
                                  className="text-link text-customBlack dark:text-customWhite after:bg-customBlack dark:after:bg-customWhite">
                                Email
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Tech;
