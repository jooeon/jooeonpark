import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import {useCursor} from "./CursorContext.jsx";

const ScrollTitleSection = () => {
    const { scrollYProgress } = useScroll();

    const [isVisible, setIsVisible] = useState(false); // Tracks visibility of title depending on scroll direction
    const [finalVisible, setFinalVisible] = useState(true); // Overrides visibility when hitting top of page
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollThreshold = 5; // Minimum scroll change to detect direction
    const [fontSize, setFontSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    let lineHeightMultiplier = 0.86;
    const { isLinkHovered } = useCursor();
    const [linkColor, setLinkColor] = useState("#fafafa");
    const colors = ["#ff800c", "#78e2ff", "#ba3bff", "#ff33a1", "#0dff86", "#6021ff", "#ffed5e"];

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const controls = useAnimation(); // Animation controls
    const [animationState, setAnimationState] = useState("visible"); // Track the current animation state

    // Handle scroll direction, hide title when scrolling up to prevent overlap with navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    setIsVisible(true);
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    setIsVisible(false);
                }
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // Animation controller for triggering animation when scroll reaches the top of the page
    const triggerAnimation = async (state) => {
        await controls.start(state);
        setAnimationState(state);
    };

    useEffect(() => {
        const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
            if (latest <= 0.2) {
                void triggerAnimation("visible");
            } else {
                void triggerAnimation("hidden");
            }
        });

        return () => unsubscribeScroll(); // Cleanup subscription
    });

    useEffect(() => {
        setFinalVisible(isVisible || animationState === "visible");
    }, [isVisible, animationState]);

    // Dynamically calculate fontSize and sectionHeight
    useEffect(() => {
        const element = document.querySelector(".title-placeholder");
        if (element) {
            const calculatedFontSize = parseFloat(window.getComputedStyle(element).fontSize);
            setFontSize(calculatedFontSize);
            setSectionHeight(calculatedFontSize * 8.2);
        }
    }, []);

    // Transform mappings for title layers
    const titleLayer1Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2, 5]);
    const titleLayer2Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 1.15, 5]);
    const titleLayer3Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 1.45, 5]);
    const titleLayer4Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 1.85, 5]);

    const titleLayer7Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 2.9, 5]);
    const titleLayer8Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 3.05, 5]);
    const titleLayer9Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 3.35, 5]);
    const titleLayer10Y = useTransform(scrollYProgress, [0, 0.15], [(vh/vw)*(2000/fontSize) + fontSize/1.2 * 3.75, 5]);

    const subTitleLayer = useTransform(scrollYProgress, [0, 0.15], [(vh / vw) * (2000 / fontSize) + fontSize * 5.0, fontSize * 0.9]);

    const titleToggle = useTransform(scrollYProgress, [0, 0.15], [1, 0], { clamp: true });
    const backgroundColor = useTransform(titleToggle, [0, 1], ["transparent", "#000000"]);

    // Randomize subtitle color
    useEffect(() => {
        if (isLinkHovered) {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setLinkColor(randomColor);
        }
    }, [isLinkHovered]);

    return (
        <motion.section
            className="sticky top-0 flex flex-col items-center mix-blend-difference text-customWhite pointer-events-none"
            style={{ height: `${sectionHeight}px` }}
            animate={finalVisible ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            transition={{
                duration: 0.4,
                delay: 0.2,
                ease: "easeIn",
            }}
        >
            <motion.h1
                className="flex justify-center w-full h-fit z-20 font-extrabold font-nick uppercase pointer-events-auto
                        text-[7vw]
                        [&_span]:top-0 [&_span]:bg-customWhite [&_span]:dark:bg-customBlack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 2.5,
                    ease: "easeIn",
                }}
            >
                <div className="absolute top-0 [&_span]:left-0">
                    <div className="title-placeholder invisible leading-[0.68]">Multidisciplinary</div>
                    <motion.span className="title-text absolute" style={{ y: titleLayer1Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Multi</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer2Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Multi</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer3Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Multi</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer4Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Multi</motion.span>
                </div>
                <div className="absolute top-0 [&_span]:right-0">
                    <div className="invisible leading-[0.68]">Multidisciplinary</div>
                    <motion.span className="title-text absolute" style={{ y: titleLayer7Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Disciplinary</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer8Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Disciplinary</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer9Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Disciplinary</motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer10Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}>Disciplinary</motion.span>
                </div>
            </motion.h1>
            <motion.h2
                className="pointer-events-auto font-nick outline-text-white text-transparent
                    text-[3vw] leading-none"
                style={{ y: subTitleLayer }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 2.5,
                    ease: "easeIn",
                }}
            >
                <Link to="/art" className="outline-text-white">
                    <motion.span
                        whileHover={{
                            color: `${linkColor}`,
                            opacity: 0.9,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Artist
                    </motion.span>
                </Link>
                &nbsp;&&nbsp;
                <Link to="/tech" className="outline-text-white">
                    <motion.span
                        whileHover={{
                            color: `${linkColor}`,
                            opacity: 0.9,
                            transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Design Technologist
                    </motion.span>
                </Link>
            </motion.h2>
        </motion.section>
    );
};

export default ScrollTitleSection;
