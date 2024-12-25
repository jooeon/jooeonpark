import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {motion} from "framer-motion";
import {useRef, useState} from "react";

const Steps = () => {

    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <>
            <Header/>
            <main className="pt-14 xl:pt-20">
                <section className="m-5 xl:my-10 xl:mx-20">
                    <div className="xl:flex ">
                        <div className="relative w-full xl:w-3/5 h-fit">
                            <video
                                id="heroVideo"
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                className="w-full"
                            >
                                <source src="src/videos/simple.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                            <button
                                className="volume-button cursor-none text-customWhite"
                                onClick={toggleMute}
                            >
                                {isMuted ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
                                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                  fill="currentColor" className="bi bi-volume-up-fill"
                                                  viewBox="0 0 16 16">
                                        <path
                                            d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                                        <path
                                            d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                                        <path
                                            d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                                    </svg>
                                }
                            </button>
                        </div>
                        <motion.div
                            className="my-6 xl:my-0 xl:p-5 xl:w-2/5"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{
                                duration: 0.5,
                                delay: 0.2,
                                ease: "linear"
                            }}
                        >
                            <h2 className="text-4xl">11,182,156 Steps</h2>
                            <p className="text-lg italic mt-2">Digital, Toshiba 1979 TV. 2024</p>
                            <p>
                                An audiovisual translation of my daily step counts since January
                                1st, 2018 to December 2nd, 2024.
                            </p>
                            <video className="mt-4 w-full xl:w-2/5" autoPlay muted loop>
                                <source src="src/videos/steps_tv.mp4" type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );
};

export default Steps;
