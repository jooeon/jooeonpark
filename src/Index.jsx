import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { motion } from "framer-motion";
import EntryAnim from "./components/EntryAnim.jsx";

const Index = () => {

    //  Use below for playing intro animation only once per session

    // const [showAnimation, setShowAnimation] = useState(false);
    //
    // useEffect(() => {
    //     // Check if the 'hasSeenAnimation' key exists in sessionStorage
    //     const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    //
    //     if (!hasSeenAnimation) {
    //         // If not seen, show the animation
    //         setShowAnimation(true);
    //
    //         // Set the 'hasSeenAnimation' flag in sessionStorage
    //         sessionStorage.setItem('hasSeenAnimation', 'true');
    //     }
    // }, []);

    // // encryption style landing animation
    // const words = ["/03-Developer", "/01-Artist", "/02-Designer"];
    // const [currentWordIndex, setCurrentWordIndex] = useState(0);
    //
    // useEffect(() => {
    //     const interval = setTimeout(() => {
    //         setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length); // Cycle through words
    //     }, 3000); // Delay of 4 seconds before switching words
    //
    //     return () => clearTimeout(interval); // Cleanup timeout on unmount
    // }, [currentWordIndex, words.length]); // Re-run when the current word changes

    // get absolute scroll position in pixels
    // const { scrollY } = useScroll();

    return (
        <>
            <Header delay={2.4}/>
            <motion.main className="flex flex-col pt-10 lg:pt-14">
                {/* Overlay for "loading" animation on page load */}
                <motion.div
                    className="fixed top-0 pointer-events-none h-full w-full font-raleway font-bold uppercase
                        bg-customWhite text-customBlack dark:bg-customBlack dark:text-customWhite z-50"
                    initial={{opacity: 1}}
                    animate={{opacity: 0}}
                    transition={{
                        duration: 0.8,
                        delay: 1.8,
                        ease: [0.16, 1, 0.3, 1] // easeOutExpo
                    }}
                >
                    <EntryAnim/>
                </motion.div>
                {/* Main landing text */}
                <section className="relative flex flex-col items-end gap-5 px-4 md:px-7 w-fit h-fit">
                    <motion.h1
                        className="w-min h-5/6 z-20 font-poppins font-bold lowercase tracking-tight
                        text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-12xl 2xl:text-12xl 3xl:text-17xl"
                        initial={{filter: 'blur(10px)'}}
                        animate={{filter: 'blur(0px)'}}
                        transition={{
                            duration: 0.2,
                            delay: 2.0,
                            ease: "linear"
                        }}
                    >
                        <span className="title-text inline-block">Design &</span>
                        <span className="title-text inline-block">Engineering</span>
                    </motion.h1>
                    <motion.h2
                        className="absolute flex flex-col top-48 right-36 p-5
                        font-semibold bg-[#034d41] text-[#ffc9e1] dark:bg-[#3318de] dark:text-[#C9F01F]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{
                            duration: 0.5,
                            delay: 2.4,
                            ease: "easeOut"
                        }}
                    >
                        <motion.span>joo eon park</motion.span>
                        <motion.span>artist, designer, & software engineer</motion.span>
                        <motion.span>from seoul, s. korea</motion.span>
                    </motion.h2>
                    <h2 className="absolute -bottom-[6rem] -right-32 flex flex-col items-end gap-2 w-fit
                        font-bold
                        text-lg sm:text-xl md:text-2xl lg:text-3xl 3xl:text-3xl">
                        <motion.span
                            className="title-text w-fit pr-[25rem]"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.3,
                                delay: 2.4,
                                ease: "easeOut"
                            }}
                        >
                            platforms for creative expression
                        </motion.span>
                        <motion.span
                            className="title-text w-fit"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.3,
                                delay: 2.6,
                                ease: "easeOut"
                            }}
                        >
                            built for high performance and timeless style
                        </motion.span>
                    </h2>
                </section>
                {/* Border */}
                <div className="px-7">
                    <motion.hr
                        className="border-2 border-customBlack dark:border-customWhite"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 2.2,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.main>
            <Footer/>
        </>
    );
};

export default Index;
