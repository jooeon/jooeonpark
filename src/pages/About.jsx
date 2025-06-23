import Header from "../components/templates/Header.jsx"
import Footer from "../components/templates/Footer.jsx"
import { motion } from "framer-motion"
import {useEffect, useState} from "react"
import { useLenis } from "lenis/react"
import {scrollToTop} from "../Utils.jsx"
import {MaskText} from "../components/textEffects/MaskText.jsx";
import {Link} from "react-router-dom";

const About = () => {
    // always begin page from top on load
    const lenis = useLenis()

    useEffect(() => {
        scrollToTop(lenis)
    }, [lenis])

    const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)

    // Mark as initially loaded after the container animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitiallyLoaded(true)
        }, 1500) // Container delay (1.1s) + some buffer

        return () => clearTimeout(timer)
    }, [])

    const aboutData = [
        "I am an artist & creative developer specializing in Web Development, UI/UX Design, and Visual Arts.",
        "I build modern, stylish websites using industry-leading technologies to create stunning first impressions that are designed to last.",
        "Don't hesitate to reach out for project inquiries."
    ];

    const skillsData = {
        DESIGN: ["UI / UX", "RESPONSIVENESS", "ACCESSIBILITY", "WIREFRAMING", "LOGO DESIGN"],
        TECHNOLOGY: ["FRONT-END DEVELOPMENT", "BACK-END DEVELOPMENT", "CMS INTEGRATION", "CREATIVE CODING", "3D"],
        "TOOLS & SOFTWARE": ["ADOBE CREATIVE CLOUD", "FIGMA"],
    }

    const linksData = [
        { name: "LINKEDIN", href: "https://linkedin.com/in/joo-eon-park" },
        { name: "GITHUB", href: "https://github.com/jooeon" },
        { name: "EMAIL", href: "mailto:jooeon427@gmail.com" },
        { name: "RESUME", href: "/files/Park_JooEon_Resume.pdf" },
    ]

    return (
        <>
            <Header />
            <main>
                <section className="px-3 md:px-3.5 xl:px-3.5 4xl:px-8 7xl:px-10 ">
                    <div className="mt-[12vh] md:mt-[15vh] xl:mt-[20vh]">
                        <h2 className="flex flex-col font-nick uppercase text-[8vw] md:text-[5vw] leading-[0.9]">
                            <MaskText phrase={"Artist"} duration={1} delay={0.8}/>
                            <span className="pl-10 md:pl-20 4xl:pl-40 6xl:pl-72"><MaskText phrase={"& Creative Developer"} duration={1} delay={0.8}/></span>
                        </h2>
                    </div>

                    {/* Info Section */}
                    <motion.div
                        className="flex justify-end mt-[10vh] md:mt-[14vh] xl:mt-[18vh] xl:mx-[2vw]"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                            duration: 0.4,
                            delay: hasInitiallyLoaded ? 0 : 1.3,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex gap-[6vw] xl:gap-[2vw] w-full xl:w-7/12">
                            <h3 className="font-roboto font-light uppercase text-[1vh] xl:text-[1vw] h-fit xl:mt-[1.25vh]">
                                Info
                            </h3>
                            <div
                                className="flex flex-col gap-[4vh] font-neueHaasGrotesk font-semibold text-white text-[2vh] xl:text-[2.5vw] leading-tight">
                                {aboutData.map((item, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{opacity: 0, y: 20}}
                                        whileInView={{opacity: 1, y: 0}}
                                        viewport={{once: true}}
                                        transition={{
                                            duration: 0.4,
                                            delay: hasInitiallyLoaded ? 0 : 1.3 + index * 0.1,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {item}
                                    </motion.p>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Skills Section */}
                    <motion.div
                        className="font-roboto font-light uppercase tracking-wide text-[1vh] xl:text-[1vw] mt-[10vh] md:mt-[14vh] xl:mt-[18vh]"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.5}}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex gap-[10vw]">
                            <h3>Skills</h3>
                            {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
                                <motion.div
                                    key={categoryIndex}
                                    initial={{opacity: 0, y: 20}}
                                    whileInView={{opacity: 1, y: 0}}
                                    viewport={{once: true, amount: 0.5}}
                                    transition={{
                                        duration: 0.4,
                                        delay: hasInitiallyLoaded ? 0.1 + categoryIndex * 0.2 : 1.3 + categoryIndex * 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <h4 className="mb-3 xl:mb-4 3xl:mb-6 4xl:mb-8 7xl:mb-12">
                                        {category}
                                    </h4>
                                    <ul className="space-y-1">
                                        {skills.map((skill, skillIndex) => (
                                            <motion.li
                                                key={skillIndex}
                                                initial={{opacity: 0, x: -10}}
                                                whileInView={{opacity: 1, x: 0}}
                                                viewport={{once: true, amount: 0.5}}
                                                transition={{
                                                    duration: 0.3,
                                                    delay: hasInitiallyLoaded ? 0.4 + skillIndex * 0.1 : 1.3 + skillIndex * 0.1,
                                                    ease: "easeOut",
                                                }}
                                            >
                                                {skill}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links section */}
                    <motion.div
                        className="font-roboto font-light uppercase tracking-wide text-[1vh] xl:text-[1vw] my-[10vh] md:my-[14vh] xl:my-[18vh]"
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.5}}
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex gap-[10vw]">
                            <h3>Links</h3>
                            <div className="flex gap-[4vw]">
                            {linksData.map((link, index) => (
                                <motion.ul
                                    key={index}
                                    initial={{opacity: 0, x: -10}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true, amount: 0.5}}
                                    transition={{
                                        duration: 0.3,
                                        delay: hasInitiallyLoaded ? index * 0.2 : 1.3 + index * 0.2,
                                        ease: "easeOut",
                                    }}
                                >
                                    <li>
                                        <Link to={link.href} target="_blank" rel="noopener noreferrer"
                                              className="text-link after:bg-customBlack dark:after:bg-customWhite">
                                            {link.name}
                                        </Link>
                                    </li>
                                </motion.ul>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </section>
            </main>
            <Footer/>
        </>
    )
}

export default About
