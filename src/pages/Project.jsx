import {Link, Navigate, useParams} from "react-router-dom";
import Header from "../components/templates/Header.jsx";
import Footer from "../components/templates/Footer.jsx";
import { motion } from "framer-motion";
import artData from "../data/ArtData.jsx";
import projectData from "../data/ProjectsData.jsx";
import PropTypes from "prop-types";
import {useRef, useState} from "react";

// Template component for individual project pages
// Reads data from data files in src/data and displays content with consistent format
const Project = () => {
    const { type, id } = useParams(); // Extract the id from the URL

    // Audio toggle functionality for "steps" project
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

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
                    <section className="relative flex m-2 md:m-5 h-full pt-10 md:pt-20">
                        {/* Image/Video content scroll section */}
                        <div className="flex flex-col gap-3 md:gap-6 w-7/12">
                            {/* Project title */}
                            <motion.div
                                className="mb-4 md:mb-20"
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.8,
                                    ease: "easeOut",
                                }}
                            >
                                <h1 className="title-text font-nick uppercase text-[7vw] leading-none">
                                    {project.caption[0]}
                                </h1>
                            </motion.div>

                            {/* Render videos */}
                            {project.videos.map((video, index) => (
                                <div key={index} className="relative overflow-hidden">
                                    <motion.video
                                        className="w-full h-full object-cover"
                                        initial={{opacity: 0, y: 40}}
                                        animate={{opacity: 1, y: 0}}
                                        transition={{
                                            duration: 0.3,
                                            delay: 1.0,
                                            ease: "easeOut",
                                        }}
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        loop
                                    >
                                        <source src={video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </motion.video>
                                    {/* Add audio toggle button only for /videos/simple.mp4 */}
                                    {(video === "/videos/JooEon_Park_OnTheTracks_Video.MOV" || video === "/videos/simple.mp4") && (
                                        <button
                                            className="absolute bottom-1 right-2 w-10 h-10 p-2 cursor-none text-customWhite"
                                            onClick={toggleMute}
                                        >
                                            {isMuted ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                     fill="currentColor"
                                                     className="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                     fill="currentColor"
                                                     className="bi bi-volume-up-fill" viewBox="0 0 16 16">
                                                    <path
                                                        d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                                    <path
                                                        d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                                    <path
                                                        d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                                                </svg>
                                            }
                                        </button>
                                    )}
                                </div>
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
                                            delay: 1.0,
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
                                h-fit w-5/12 p-0 pt-16 md:p-5 md:pt-32 2xl:pt-48 4xl:pt-56 font-almarai font-extrabold uppercase"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.3,
                                delay: 0.9,
                                ease: "easeOut",
                            }}
                        >
                            <p className="text-right col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl">Year</p>
                            <p className="col-start-3 text-3xs xs:text-2xs md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl">{project.caption[3]}</p>

                            <p className="text-right col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl">Type</p>
                            <p className="col-start-3 text-3xs xs:text-2xs md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl">{project.caption[1]}</p>

                            {type === "art" && (
                                <>
                                    <p className="text-right col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl">Medium</p>
                                    <p className="col-start-3 text-3xs xs:text-2xs md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl">{project.caption[2]}</p>
                                </>
                            )}

                            <p className="text-right col-start-2 text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl">Info</p>
                            <p className="col-start-3 text-3xs xs:text-2xs md:text-lg lg:text-2xl xl:text-2xl 2xl:text-3xl 3xl:text-5xl 4xl:text-6xl">{project.caption[4]}</p>

                            {project.externalLink && (
                                <div className=" col-start-3 row-start-5 pt-2 md:pt-4">
                                    <Link
                                        to={project.externalLink}
                                        target="_blank"
                                        className="text-link after:bg-customBlack dark:after:bg-customWhite w-fit
                                            text-4xs xs:text-4xs md:text-xs lg:text-sm xl:text-sm 2xl:text-lg 3xl:text-2xl 4xl:text-3xl"
                                    >
                                        {project.externalLinkLabel} ↗
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    </section>
                    {type === "art" && (
                        <section
                            className="flex justify-between m-2 md:m-5 mt-10 md:mt-20 font-almarai font-extrabold uppercase">
                            <div
                                className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl">
                                <span>Next:</span>
                                <br/>
                                <Link
                                    to={`/project/${nextProject.id}`}
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
