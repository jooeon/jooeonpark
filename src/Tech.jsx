import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useScroll } from "framer-motion";
import EncryptionText from "./components/EncryptionAnim.jsx";
// import AsciiAnimation from "./components/AsciiAnim.jsx";
import TransmissionModel from "./components/TransmissionModel.jsx";
import ParallaxText from "./components/ParallaxText.jsx";
import { isMobile } from "react-device-detect";
import {Link} from "react-router-dom";

const Tech = () => {

    // get absolute scroll position in pixels
    const { scrollY } = useScroll();

    return (
        <>
            <Header/>
            <main className="pt-16 xl:pt-24">
                {/* Main landing text */}
                <section className="relative flex flex-col gap-16 md:gap-28 lg:gap-36 px-5 md:px-7 h-screen">
                    {/* 3D animation */}
                    {/*
                        Swap between TransmissionModel and AsciiAnimation for different moods
                        Use h1 below for AsciiAnimation
                    */}
                    {/*{!isMobile && <TransmissionModel/>}*/}
                    {/*<h1 className="absolute flex justify-center items-center top-0 right-10 w-50vw h-[30vh] lg:h-[40vh] 4xl:h-[30vh] 5xl:h-[25vh]*/}
                    {/*    text-red-600 text-8xl"*/}
                    {/*>*/}
                    {/*    Digital Experiences*/}
                    {/*</h1>*/}
                    {/* About text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl xl:pl-5">
                        <h2 className="lowercase font-semibold font-outfit mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-xs md:text-base lg:text-lg">
                            <EncryptionText
                                text={"Skills"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <div className="flex flex-col gap-10 w-full text-xl lowercase
                            [&_caption]:w-fit [&_caption]:mb-2 [&_caption]:text-start
                            [&_caption]:text-xl [&_caption]md:text-2xl [&_caption]:lg:text-3xl [&_caption]:font-bold
                            [&_tr]:border-b [&_tr]:text-customGray [&_tr]:border-customGrayLight [&_tr]:dark:border-customBlackLight [&_tr]:font-semibold
                            [&_td]:pt-2 [&_td]:pb-1 [&_td]:pl-3 [&_td]:md:pl-5 [&_td]:relative [&_td]:text-xs [&_td]:md:text-base [&_td]:lg:text-xl">
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
                    <div className="mb-10 md:mb-12 lg:mb-[4.5rem] 2xl:mb-24
                        xl:px-5 lowercase">
                        <h2 className="font-semibold mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-xs md:text-base lg:text-lg">
                            <EncryptionText
                                text={"Tech Stack & Software"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <div className="absolute left-0 w-full flex overflow-hidden items-center font-extrabold py-5
                            text-4xl md:text-5xl lg:text-7xl 2xl:text-12xl">
                            <ParallaxText
                                textArray={["react", "next.js", "tailwind", "framer motion", "sql", "prisma", "adobe cc", "figma"]}
                                baseVelocity={isMobile ? 50 : 100}
                                scrollY={scrollY}
                            />
                        </div>
                    </div>
                    {/* Connect text */}
                    <div className="xl:w-1/2 text-xl md:text-3xl lg:text-3xl 2xl:text-4xl xl:px-5">
                        <h2 className="lowercase font-semibold mb-2 ml-1 min-h-7 md:min-h-9 xl:min-h-10 text-xs md:text-base lg:text-lg">
                            <EncryptionText
                                text={"Connect"}
                                delay={0.4}
                                duration={0.75}
                                speed={20}
                            />
                        </h2>
                        <div className="flex gap-10 md:gap-20 lowercase font-semibold">
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
