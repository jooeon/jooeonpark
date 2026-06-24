import {Link, Navigate, useNavigate, useParams} from "react-router-dom";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import {AnimatePresence, motion} from "motion/react";
import artData from "../data/ArtData.jsx";
import projectData from "../data/WorkData.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {MaskText} from "../components/textEffects/MaskText.jsx";
import { useLenis } from 'lenis/react';
import {scrollToTop} from "../Utils.jsx";
import VideoPlayer from "../components/templates/VideoPlayer.jsx";
import Overlay from "../components/Overlay.jsx";
import designData from "../data/DesignData.jsx";

// Template component for individual project pages
// Reads data from data files in src/data and displays content with consistent format
const WorkDetail = () => {
    const { type, id } = useParams(); // Extract the id from the URL

    // functions and variables for image overlay on click
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const navigate = useNavigate();

    const goToPreviousPage = () => {
        navigate(-1);
    };

    const openOverlay = (index) => {
        setCurrentIndex(index);
        setOverlayVisible(true);
    };

    const closeOverlay = () => setOverlayVisible(false);

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    // choose the correct data array
    const items = type === "art"
        ? artData
        : type === "web"
            ? projectData
            : type === "design"
                ? designData
                : null

    // if the “type” wasn’t recognized, you can optionally redirect or show an error
    if (items === null) {
        return <Navigate to="/404" replace />;
    }

    // find the one item whose id matches
    const project = items.find(item => item.id === id);
    if (!project) {
        return <div className="flex flex-col justify-center items-center gap-[2vh] w-full h-screen">
            <p className="text-fluid-base font-neueHaasGrotesk font-bold">Project not found.</p>
            <button onClick={goToPreviousPage}
                  className="text-link after:bg-customBlack dark:after:bg-customWhite">
                Go back
            </button>
        </div>;
    }

    const media = [
        ...project.images.map((src) => ({ src, type: "image" })),
        ...project.videos.map((v) => ({ src: v.source, type: "video", hasAudio: v.hasAudio })),
    ];

    console.log(media)

    // find next if you have a nextItem pointer
    const nextProject = items.find(item => item.id === project.nextItem);

    if (!project) {
        return <p>Project not found</p>; // Fallback if ID is invalid
    }

    return (
        <>
            <Header/>
            <main className="flex flex-col min-h-[100vh]">
                <div className="flex flex-col flex-1 justify-between">
                    <section
                        className="relative flex m-2 md:m-5 6xl:m-10 h-full pt-[6vh] xl:pt-[5vw]">
                        {/* Image/Video content scroll section */}
                        <div className="flex flex-col gap-3 md:gap-6 6xl:gap-12 w-full lg:w-7/12">
                            {/* WorkDetail title */}
                            <motion.div
                                className="mt-2 mb-2 md:mt-0 md:mb-4 xl:mb-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.8,
                                    ease: "easeOut",
                                }}
                            >
                                <h1 className="title-text font-nick uppercase text-fluid-xl md:text-fluid-2xl lg:text-fluid-4xl leading-none">
                                    <MaskText phrase={project.caption[0]} duration={1} delay={0.8}/>
                                </h1>
                            </motion.div>

                            {/* Description for mobile */}
                            <motion.div
                                className="lg:hidden grid top-0 auto-rows-min
                                gap-y-1 md:gap-y-3 gap-x-2 md:gap-x-4
                                h-fit w-full p-0 mb-2 md:mb-4 font-neueHaasGrotesk font-bold uppercase
                                text-fluid-xs md:text-fluid-base [&_p.label]:text-fluid-3xs md:[&_p.label]:text-fluid-xs"
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    duration: 0.3,
                                    delay: 1.1,
                                    ease: "easeOut",
                                }}
                            >
                                <p className="label text-right p-0.5 md:p-1 col-start-2">Year</p>
                                <p className="col-start-3">{project.caption[3]}</p>

                                <p className="label text-right p-0.5 md:p-1 col-start-2">Type</p>
                                <p className="col-start-3">{project.caption[1]}</p>

                                {type === "art" &&
                                    <>
                                        <p className="label text-right p-0.5 md:p-1 col-start-2">Medium</p>
                                        <p className="col-start-3">{project.caption[2]}</p>
                                    </>
                                }
                                {type === "web" &&
                                    <>
                                        <p className="label text-right p-0.5 md:p-1 col-start-2">Tech</p>
                                        <p className="col-start-3">{project.caption[2]}</p>
                                    </>
                                }

                                <p className="label text-right p-0.5 md:p-1 col-start-2">Info</p>
                                <p className="col-start-3">{project.caption[4]}</p>

                                <div className="flex flex-col gap-1 md:gap-4 col-start-3 pt-2 md:pt-4">
                                    {project.externalLink && (
                                        <Link
                                            to={project.externalLink}
                                            target="_blank"
                                            className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-fluid-3xs md:text-fluid-xs"
                                        >
                                            {project.externalLinkLabel} ↗
                                        </Link>
                                    )}
                                    {project.externalLink_2 && (
                                        <Link
                                            to={project.externalLink_2}
                                            target="_blank"
                                            className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-fluid-3xs md:text-fluid-xs"
                                        >
                                            {project.externalLinkLabel_2} ↗
                                        </Link>
                                    )}
                                </div>
                            </motion.div>

                            {/* Render videos */}
                            {project.videos.map((video, index) => (
                                <VideoPlayer
                                    key={index}
                                    onClick={() => openOverlay(project.images.length + index)}
                                    src={video.source}
                                    hasAudio={video.hasAudio}
                                />
                            ))}

                            {/* Render images */}
                            {project.images.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => openOverlay(index)}
                                    tabIndex={0}
                                    aria-label={`Open overlay for fullscreen image view`}
                                    className="overflow-hidden"
                                >
                                    <motion.img
                                        src={image}
                                        alt={project.alt}
                                        className="w-full h-full object-cover cursor-pointer"
                                        loading="lazy"
                                        initial={{opacity: 0, y: 40}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{
                                            duration: 0.3,
                                            delay: 1.2,
                                            ease: "easeOut",
                                        }}
                                    />
                                </div>
                            ))}

                        </div>

                        {/* Description section */}
                        <motion.div
                            className="sticky hidden lg:grid top-0 md:grid-cols-[1fr_1fr_8fr_1fr] auto-rows-min
                                gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                                h-fit w-5/12 p-0 pt-16 md:p-5 md:pt-32 2xl:pt-48 4xl:pt-56 font-neueHaasGrotesk font-bold uppercase
                                text-fluid-xs lg:text-fluid-lg [&_p.label]:text-fluid-3xs lg:[&_p.label]:text-fluid-sm"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.3,
                                delay: 1.1,
                                ease: "easeOut",
                            }}
                        >
                            <p className="label text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2">Year</p>
                            <p className="col-start-3">{project.caption[3]}</p>

                            <p className="label text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2">Type</p>
                            <p className="col-start-3">{project.caption[1]}</p>

                            {type === "art" &&
                                <>
                                    <p className="label text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2">Medium</p>
                                    <p className="col-start-3">{project.caption[2]}</p>
                                </>
                            }
                            {type === "web" &&
                                <>
                                    <p className="label text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2">Tech</p>
                                    <p className="col-start-3">{project.caption[2]}</p>
                                </>
                            }

                            <p className="label text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2">Info</p>
                            <p className="col-start-3">{project.caption[4]}</p>

                            <div className="flex flex-col gap-1 md:gap-4 col-start-3 pt-2 md:pt-4">
                                {project.externalLink && (
                                    <Link
                                        to={project.externalLink}
                                        target="_blank"
                                        className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-fluid-3xs lg:text-fluid-sm"
                                    >
                                        {project.externalLinkLabel} ↗
                                    </Link>
                                )}
                                {project.externalLink_2 && (
                                    <Link
                                        to={project.externalLink_2}
                                        target="_blank"
                                        className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-fluid-3xs lg:text-fluid-sm"
                                    >
                                        {project.externalLinkLabel_2} ↗
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </section>
                    <section className="flex justify-between m-2 md:m-5 mt-10 md:mt-20 font-neueHaasGrotesk font-extrabold uppercase">
                        <div
                            className="text-fluid-base lg:text-fluid-xl w-1/2">
                            <span>Next:</span>
                            <br/>
                            {type === "art" && (
                                <Link
                                    to={`/art/${nextProject.id}`}
                                    className="text-link after:bg-customBlack dark:after:bg-customWhite ml-10"
                                >
                                    {nextProject.caption[0]}
                                </Link>
                            )}
                            {type === "web" && (
                                <Link
                                    to={`/web/${nextProject.id}`}
                                    className="text-link after:bg-customBlack dark:after:bg-customWhite ml-10"
                                >
                                    {nextProject.caption[0]}
                                </Link>
                            )}
                            {type === "design" && (
                                <Link
                                    to={`/design/${nextProject.id}`}
                                    className="text-link after:bg-customBlack dark:after:bg-customWhite ml-10"
                                >
                                    {nextProject.caption[0]}
                                </Link>
                            )}
                        </div>
                        <div className="flex items-end pr-2
                            text-fluid-xs lg:text-fluid-base">
                            {type === "art" && (
                                <Link to="/art" className="text-link after:bg-customBlack dark:after:bg-customWhite">Back to Gallery</Link>
                            )}
                            {type === "web" && (
                                <Link to="/web" className="text-link after:bg-customBlack dark:after:bg-customWhite">Back to [Web]</Link>
                            )}
                            {type === "design" && (
                                <Link to="/design" className="text-link after:bg-customBlack dark:after:bg-customWhite">Back to [Design]</Link>
                            )}
                        </div>
                    </section>
                </div>
                <Footer />
            </main>

            {/* Image overlay */}
            <AnimatePresence>
                {overlayVisible && (
                    <Overlay
                        media={media}
                        currentIndex={currentIndex}
                        closeOverlay={closeOverlay}
                        key="overlay"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

// PropTypes validation
WorkDetail.propTypes = {
    id: PropTypes.number,
};

export default WorkDetail;
