import {useState, useEffect, useRef} from "react";
import {motion, useScroll, useTransform, useAnimation, useMotionValueEvent} from "motion/react";
import { Link } from "react-router-dom";
import {MaskText} from "./textEffects/MaskText.jsx";
import PropTypes from "prop-types";
import {pickRandomColor} from "../Utils.jsx";

const ScrollTitleSection = ({showEntryAnimation}) => {
    const { scrollY, scrollYProgress } = useScroll();

    const [isVisible, setIsVisible] = useState(false); // Tracks visibility of title depending on scroll direction
    const [finalVisible, setFinalVisible] = useState(true); // Overrides visibility when hitting top of page
    const lastY = useRef(0);
    const scrollThreshold = 5; // Minimum scroll change to detect direction
    const [fontSize, setFontSize] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(0);
    let lineHeightMultiplier = 0.86;
    const [linkColor, setLinkColor] = useState("#fafafa");
    // index 0~4, title text (multidisciplinary), index 5 subtitle text
    const baseDelays = [3.1, 3.0, 2.9, 2.6, 3.5];
    const newDelays = [1.1, 1.0, 0.9, 0.6, 1.5];
    const delays = showEntryAnimation
        ? baseDelays
        : newDelays;

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const controls = useAnimation(); // Animation controls
    const [animationState, setAnimationState] = useState("visible"); // Track the current animation state

    // Subtitle fade out state
    const [subTitleVisible, setSubTitleVisible] = useState(true);
    const subTitleFadeThreshold = 0.1; // Adjust this value to control when subtitle fades out

    // Track if initial entry animation has completed
    const [hasEntryAnimationPlayed, setHasEntryAnimationPlayed] = useState(false);

    // Handle scroll direction, hide title when scrolling up to prevent overlap with navbar
    useMotionValueEvent(scrollY, "change", latest => {
        if (Math.abs(latest - lastY.current) > scrollThreshold) {
            // Positive velocity = scrolling down
            setIsVisible(latest > lastY.current); // hide when scrolling up, show when scrolling down
            lastY.current = latest;
        }
    });

    // Animation controller for triggering animation when scroll reaches the top of the page
    const triggerAnimation = async (state) => {
        await controls.start(state);
        setAnimationState(state);
    };

    useEffect(() => {
        const unsubscribeScroll = scrollYProgress.on("change", (latest) => {
            if (latest <= 0.2) {
                void triggerAnimation("visible");
            } else if (latest >= 0.96) {    // hide when hitting bottom of screen
                setIsVisible(false);
            } else {
                void triggerAnimation("hidden");
            }

            // Handle subtitle fade out based on threshold
            if (latest >= subTitleFadeThreshold) {
                // Check scroll direction - if scrolling up, show subtitle
                if (scrollY.get() < lastY.current) {
                    setSubTitleVisible(true);
                } else {
                    setSubTitleVisible(false);
                }
            } else {
                setSubTitleVisible(true);
            }
        });

        return () => unsubscribeScroll(); // Cleanup subscription
    });

    useEffect(() => {
        setFinalVisible(isVisible || animationState === "visible");
    }, [isVisible, animationState]);

    // Mark entry animation as played after delays complete
    useEffect(() => {
        if (showEntryAnimation) {
            const timer = setTimeout(() => {
                setHasEntryAnimationPlayed(true);
            }, (delays[4] + 0.5) * 1000); // Wait for subtitle delay + duration
            return () => clearTimeout(timer);
        } else {
            setHasEntryAnimationPlayed(true);
        }
    }, [showEntryAnimation, delays]);

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

    const subTitleLayer = useTransform(scrollYProgress, [0, 0.15], [(vh / vw) * (2000 / fontSize) + fontSize * 5.0, fontSize * 1.0]);

    // Background of text visible initially for cascade effect, hides after inputRange when it can overlap with other elements when scrolling down
    const titleToggle = useTransform(scrollYProgress, [0, 0.15], [1, 0], { clamp: true });
    const backgroundColor = useTransform(titleToggle, [0, 1], ["transparent", "#000000"]);

    // Determine subtitle delay based on conditions
    const getSubTitleDelay = () => {
        // Initial load delays, on entry animation condition
        if (!hasEntryAnimationPlayed) {
            return delays[4]; // 3.5 or 1.5 depending on showEntryAnimation
        }
        // All scroll-triggered changes have 0 delay
        return 0;
    };

    return (
        <motion.section
            className="sticky top-0 flex flex-col items-center z-20 mix-blend-difference text-customWhite pointer-events-none"
            style={{ height: `${sectionHeight}px` }}
            animate={finalVisible ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
            }}
            transition={{
                duration: 0.4,
                delay: hasEntryAnimationPlayed ? 0 : 0.2, // 0 delay for scroll-triggered changes
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
                    delay: showEntryAnimation ? 2.5 : 0,
                    ease: "easeIn",
                }}
            >
                <div className="absolute top-0 [&_span]:left-0">
                    <div className="title-placeholder invisible leading-[0.68]">Multidisciplinary</div>
                    <motion.span className="title-text absolute" style={{ y: titleLayer1Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Multi"} duration={0.8} delay={delays[0]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer2Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Multi"} duration={1.0} delay={delays[1]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer3Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Multi"} duration={1.2} delay={delays[2]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer4Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Multi"} duration={1.5} delay={delays[3]}/></motion.span>
                </div>
                <div className="absolute top-0 [&_span]:right-0">
                    <div className="invisible leading-[0.68]">Multidisciplinary</div>
                    <motion.span className="title-text absolute" style={{ y: titleLayer7Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Disciplinary"} duration={0.8} delay={delays[0]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer8Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Disciplinary"} duration={1.0} delay={delays[1]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer9Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Disciplinary"} duration={1.2} delay={delays[2]}/></motion.span>
                    <motion.span className="title-text absolute" style={{ y: titleLayer10Y, backgroundColor, lineHeight: `${fontSize*lineHeightMultiplier}px`}}><MaskText phrase={"Disciplinary"} duration={1.5} delay={delays[3]}/></motion.span>
                </div>
            </motion.h1>
            <motion.h2
                className="pointer-events-auto font-nick outline-text-white text-transparent
                    text-[3vw] leading-none"
                style={{ y: subTitleLayer }}
                initial={{ opacity: 0 }}
                animate={{ opacity: subTitleVisible ? 1 : 0 }}
                transition={{
                    duration: 0.5,
                    delay: getSubTitleDelay(),
                    ease: "easeIn",
                }}
            >
                <Link to="/design" className="outline-text-white">
                    <motion.span
                        onHoverStart={() => {
                            const newColor = pickRandomColor();
                            setLinkColor(newColor);
                        }}
                        whileHover={{
                            color: linkColor,
                            opacity: 0.9,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Design
                    </motion.span>
                </Link>
                &nbsp;
                <Link to="/work" className="outline-text-white">
                    <motion.span
                        onHoverStart={() => {
                            const newColor = pickRandomColor();
                            setLinkColor(newColor);
                        }}
                        whileHover={{
                            color: linkColor,
                            opacity: 0.9,
                            transition: {duration: 0.2},
                        }}
                        whileTap={{scale: 0.9}}
                    >
                        Technologist
                    </motion.span>
                </Link>
            </motion.h2>
        </motion.section>
    );
};

ScrollTitleSection.propTypes = {
    showEntryAnimation: PropTypes.bool,
};

export default ScrollTitleSection;