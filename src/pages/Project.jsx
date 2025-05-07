import {Link, Navigate, useParams} from "react-router-dom";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import { motion } from "framer-motion";
import artData from "../data/ArtData.jsx";
import projectData from "../data/ProjectsData.jsx";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {MaskText} from "../components/MaskText.jsx";
import { useLenis } from 'lenis/react';
import {scrollToTop} from "../Utils.jsx";
import VideoPlayer from "../components/templates/VideoPlayer.jsx";

// Template component for individual project pages
// Reads data from data files in src/data and displays content with consistent format
const Project = () => {
    const { type, id } = useParams(); // Extract the id from the URL

    // always begin page from top on load
    const lenis = useLenis();

    useEffect(() => {
        scrollToTop(lenis);
    }, [lenis]);

    // choose the correct data array
    const items = type === "art"
        ? artData
        : type === "project"
            ? projectData
            : null;

    // if the “type” wasn’t recognized, you can optionally redirect or show an error
    if (items === null) {
        return <Navigate to="/404" replace />;
    }

    // find the one item whose id matches
    const project = items.find(item => item.id === id);
    if (!project) {
        return <p>Project not found.</p>;
    }

    // find next if you have a nextItem pointer
    const nextProject = items.find(item => item.id === project.nextItem);

    if (!project) {
        return <p>Project not found</p>; // Fallback if ID is invalid
    }

    return (
        <>
            <Header />
            <main>
                <div className="flex flex-col">
                    <section className="relative flex m-2 md:m-5 6xl:m-10 h-full pt-10 md:pt-20 3xl:pt-32 6xl:pt-40 7xl:pt-52">
                        {/* Image/Video content scroll section */}
                        <div className="flex flex-col gap-3 md:gap-6 6xl:gap-12 w-7/12">
                            {/* Project title */}
                            <motion.div
                                className="mb-4 md:mb-10 xl:mb-20"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.8,
                                    ease: "easeOut",
                                }}
                            >
                                <h1 className="title-text font-nick uppercase text-[5vw] 2xl:text-[5.4vw] leading-none">
                                    <MaskText phrase={project.caption[0]} duration={1} delay={0.8}/>
                                </h1>
                            </motion.div>

                            {/* Render videos */}
                            {project.videos.map((video, index) => (
                                <VideoPlayer
                                    key={index}
                                    src={video.source}
                                    hasAudio={video.hasAudio}
                                />
                            ))}

                            {/* Render images */}
                            {project.images.map((image, index) => (
                                <div key={index} className="overflow-hidden">
                                    <motion.img
                                        src={image}
                                        alt={project.alt}
                                        className="w-full h-full object-cover"
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
                            className="sticky top-0 grid md:grid-cols-[1fr_1fr_8fr_1fr] auto-rows-min
                                gap-y-1 md:gap-y-3 lg:gap-y-4 3xl:gap-y-8 gap-x-2 md:gap-x-4 lg:gap-x-6 3xl:gap-x-10
                                h-fit w-5/12 p-0 pt-16 md:p-5 md:pt-32 2xl:pt-48 4xl:pt-56 font-neueHaasGrotesk font-extrabold uppercase
                                text-3xs xs:text-2xs md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl 6xl:text-7xl 7xl:text-8xl"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.3,
                                delay: 1.1,
                                ease: "easeOut",
                            }}
                        >
                            <p className="text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl 6xl:text-4xl 7xl:text-5xl">Year</p>
                            <p className="col-start-3">{project.caption[3]}</p>

                            <p className="text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl 6xl:text-4xl 7xl:text-5xl">Type</p>
                            <p className="col-start-3">{project.caption[1]}</p>

                            {type === "art" && (
                                <>
                                    <p className="text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl 6xl:text-4xl 7xl:text-5xl">Medium</p>
                                    <p className="col-start-3">{project.caption[2]}</p>
                                </>
                            )}

                            <p className="text-right md:p-1.5 4xl:p-2 6xl:p-3 7xl:p-6 col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl 6xl:text-4xl 7xl:text-5xl">Info</p>
                            <p className="col-start-3">{project.caption[4]}</p>

                            <div className="flex flex-col gap-1 md:gap-4 col-start-3 pt-2 md:pt-4">
                                {project.externalLink && (
                                    <Link
                                        to={project.externalLink}
                                        target="_blank"
                                        className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
                                    >
                                        {project.externalLinkLabel} ↗
                                    </Link>
                                )}
                                {project.externalLink_2 && (
                                    <Link
                                        to={project.externalLink_2}
                                        target="_blank"
                                        className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
                                    >
                                        {project.externalLinkLabel_2} ↗
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </section>
                    {type === "art" && (
                    <section className="flex justify-between m-2 md:m-5 mt-10 md:mt-20 font-neueHaasGrotesk font-extrabold uppercase">
                        <div
                            className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                            <span>Next:</span>
                            <br/>
                            <Link
                                to={`/art/${nextProject.id}`}
                                className="text-link after:bg-customBlack dark:after:bg-customWhite ml-10"
                            >
                                {nextProject.caption[0]}
                            </Link>
                        </div>
                        <div className="flex items-end pr-2
                            text-3xs sm:text-2xs md:text-sm lg:text-sm xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl">
                            <Link to="/art" className="text-link after:bg-customBlack dark:after:bg-customWhite">Back to Gallery</Link>
                        </div>
                    </section>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

// PropTypes validation
Project.propTypes = {
    id: PropTypes.number,
};

export default Project;
