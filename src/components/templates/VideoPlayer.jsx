import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function VideoPlayer({ src, hasAudio }) {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
    };

    return (
        <div className="relative overflow-hidden">
            <motion.video
                className="w-full h-full object-cover"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.3,
                    delay: 1.2,
                    ease: "easeOut",
                }}
                ref={videoRef}
                autoPlay
                playsInline
                muted={isMuted}
                loop
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </motion.video>

            {hasAudio && (
                <button
                    className="absolute bottom-1 right-2 w-10 h-10 p-2 cursor-pointer text-customWhite"
                    onClick={toggleMute}
                >
                    {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-volume-mute-fill" viewBox="0 0 16 16">
                            <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06m7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-volume-up-fill" viewBox="0 0 16 16">
                            <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z"/>
                            <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z"/>
                            <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06"/>
                        </svg>
                    )}
                </button>
            )}
        </div>
    );
}

VideoPlayer.propTypes = {
    src: PropTypes.string.isRequired,
    hasAudio: PropTypes.bool,
};
