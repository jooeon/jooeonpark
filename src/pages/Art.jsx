import { Link } from "react-router-dom";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import { motion } from "motion/react";
import {items} from "../data/ArtData.jsx";
import HorizontalScrollSection from '../components/HorizontalScrollSection.jsx';
import {useMediaQuery} from "../Utils.jsx";
import HalftoneOverlayShader from "../components/shaders/HalftoneOverlay.jsx";
import {useEffect, useState} from "react";

const COLORS = [
    {name: 'Teal', color: '#2DB5B4'},
    {name: 'Red', color: '#fc0834'},
    {name: 'Blue', color: '#4a21ff'},
    {name: 'Green', color: '#33ff57'},
    {name: 'Light-Blue', color: '#33c4ff'},
    {name: 'Purple', color: '#a633ff'},
    {name: 'Pink', color: '#ff33a1'},
    {name: 'Orange', color: '#ff5733'},
    {name: 'Yellow', color: '#ffef73'},
];
const IMAGES = [
    "cat_2.jpg",
    "cat.webp",
    "portrait_3.jpg",
    "eye.jpg",
    "portrait_2.jpg",
    "portrait_1.jpg",
    "ulysess.jpg",
    "jellyfish_2.avif",
    "jellyfish.webp",
    "wolf-spider.avif",
    "ocelot.jpg",
    "poison_frog.webp",
];
const IMG_PATH = "/images/thumbnails/cool_images";

const Art = () => {
    const isXlOrLarger = useMediaQuery('(min-width: 1280px)');

    const [randomColor, setRandomColor] = useState(COLORS[0].color);
    const [randomImage, setRandomImage] = useState("");

    useEffect(() => {
        const update = () => {
            const imageIndex = Math.floor(Math.random() * IMAGES.length);
            const colorIndex = Math.floor(Math.random() * COLORS.length);

            setRandomImage(`${IMG_PATH}/${IMAGES[imageIndex]}`);
            setRandomColor(COLORS[colorIndex].color);
        };

        update(); // initial

        const id = setInterval(update, 3000);
        return () => clearInterval(id);
    }, []);

    return (
        <>
            <Header/>
            <main className="">
                {isXlOrLarger && <section className="relative flex justify-center items-center p-7 h-[60vh]">
                    <h1 className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center leading-none uppercase font-nick
                        text-fluid-xl">
                        Creative Works
                    </h1>
                    <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                        *:border-customGrayLight *:dark:border-customBlackLight">
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className="border-r"></div>
                        <div className=""></div>
                    </div>
                </section>}
                {/* Use horizontal scroll only on desktop, since it is awkward on touch screens */}
                {isXlOrLarger ?
                    <section className="relative flex justify-center items-center w-full">
                        <div className="absolute top-0 bottom-0 flex flex-wrap w-full -z-10 *:w-1/4
                            *:border-customGrayLight *:dark:border-customBlackLight">
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className="border-r"></div>
                            <div className=""></div>
                        </div>
                        <HorizontalScrollSection gap={20}>
                            {items.map((item) => {
                                const animationProps = item.hasAnimation
                                    ? {
                                        initial: {opacity: 0, y: 70},
                                        whileInView: {opacity: 1, y: 0},
                                        viewport: {once: true},
                                        transition: {
                                            duration: 0.5,
                                            delay: 0.7 + item.animationDelay,
                                            ease: "easeOut",
                                        },
                                    }
                                    : {};

                                return (
                                    <motion.div
                                        key={item.id}
                                        className="thumbnail-img flex flex-col w-full"
                                        {...animationProps}
                                    >
                                        {/* Video/image content */}
                                        <Link to={item.link} className="">
                                            {item.isVideo && (
                                                <video
                                                    autoPlay
                                                    playsInline
                                                    muted
                                                    loop
                                                    className=""
                                                >
                                                    <source src={item.thumbnail} type="video/mp4"/>
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                            {!item.isVideo && (
                                                item.id === "rig" ?
                                                    // See Utils for getRandomImage and images loaded
                                                    <div className="aspect-square">
                                                        <HalftoneOverlayShader
                                                            imageUrl={randomImage}
                                                            gridSize={30}
                                                            baseColor={randomColor}
                                                            invertBrightness={true}
                                                        />
                                                    </div>
                                                    :
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={`Gallery ${item.id + 1}`}
                                                        className=""
                                                        loading="lazy"
                                                    />
                                            )}
                                            {/* Bottom captions */}
                                            <div
                                                className="flex justify-between gap-10 pt-1 font-neueHaasGrotesk font-bold lowercase text-sm 4xl:text-xl">
                                            {item.caption && (
                                                    <>
                                                        {/* Bottom-Left Caption */}
                                                        {item.caption[0] && (
                                                            <p className="">
                                                                {item.caption[0]}
                                                            </p>
                                                        )}

                                                        {/* Bottom-Right Caption */}
                                                        {item.caption[3] && (
                                                            <p className="text-customGray">
                                                                {item.caption[3]}
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </HorizontalScrollSection>
                    </section>
                    :
                    <motion.div
                        className="pt-10 pl-5 md:pt-20 md:pl-10 pb-2 md:pb-10"
                        initial={{opacity: 0, y: 40}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            duration: 0.3,
                            delay: 0.6,
                            ease: "easeOut"
                        }}
                    >
                        <h1 className="title-text font-nick uppercase text-4xl sm:text-5xl md:text-7xl lg:text-8xl 4xl:text-9xl">Creative Works</h1>
                    </motion.div>
                }
                {!isXlOrLarger && <section className="flex flex-row flex-wrap justify-between gap-5
                    h-min w-full xl:w-11/12 p-5 mx-auto uppercase">
                    {items.map((item) => (
                        <div className={`flex flex-col w-full h-full xl:w-2/5 xl:h-2/5 ${item.padding}`}
                             key={item.id}>
                            <motion.div
                                className=""
                                initial={{opacity: 0, y: 50, filter: "blur(10px)",}}
                                whileInView={{opacity: 1, y: 0, filter: "none",}}
                                viewport={{once: true}}
                                transition={{
                                    duration: 0.8,
                                    delay: 0,
                                    ease: "easeOut",
                                }}
                            >
                                {/* Video/image content */}
                                <Link to={item.link} className="">
                                    {item.isVideo && (
                                        <video
                                            autoPlay
                                            playsInline
                                            muted
                                            loop
                                            className="w-full py-3"
                                        >
                                            <source src={item.thumbnail} type="video/mp4"/>
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    {!item.isVideo && (
                                        item.id === "rig" ?
                                            <div className="aspect-square">
                                                <HalftoneOverlayShader
                                                    imageUrl={randomImage}
                                                    gridSize={30}
                                                    baseColor={randomColor}
                                                    invertBrightness={true}
                                                />
                                            </div>
                                        :
                                            <img
                                                src={item.thumbnail}
                                                alt={item.alt}
                                                loading="lazy" // Adds lazy loading for performance
                                                className="w-full aspect-square md:aspect-auto object-cover py-3"
                                            />
                                    )}
                                </Link>
                                {/* Bottom captions */}
                                <div className="flex justify-between gap-10 font-neueHaasGrotesk font-bold lowercase">
                                    {item.caption && (
                                        <>
                                            {/* Bottom-Left Caption */}
                                            {item.caption[0] && (
                                                <p className="">
                                                    {item.caption[0]}
                                                </p>
                                            )}

                                            {/* Bottom-Right Caption */}
                                            {item.caption[3] && (
                                                <p className="text-customGray">
                                                    {item.caption[3]}
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </section>
                }
            </main>
            <div className="hidden"><Footer/></div>
        </>
    );
};

export default Art;