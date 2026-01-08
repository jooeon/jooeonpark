import {useEffect, useRef, useState} from 'react';
import { motion } from 'framer-motion';
import {useCursor} from "./cursor/CursorContext.jsx";
import PropTypes from "prop-types";

const RecentSongScroll = () => {
    const [scrollText, setScrollText] = useState('');
    const [albumArt, setAlbumArt] = useState('');
    const [loading, setLoading] = useState(true);
    const [scrollWidth, setScrollWidth] = useState(0);
    const textRef = useRef(null);

    const { handleAlbumHover, handleAlbumLeave } = useCursor();

    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

    // Cache configuration
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
    const CACHE_KEY = 'lastfm_recent_song';
    const CACHE_TIMESTAMP_KEY = 'lastfm_recent_song_timestamp';

    const handleMouseEnter = () => {
        if (albumArt) {
            handleAlbumHover(albumArt);
        }
    };

    const handleMouseLeave = () => {
        handleAlbumLeave();
    };

    useEffect(() => {
        // Check if credentials are available
        if (!API_KEY || !USERNAME) {
            console.error('Missing Last.fm API credentials');
            setLoading(false);
            return;
        }

        // Check if we have valid cached data
        const checkCache = () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cachedAlbumArt = localStorage.getItem(CACHE_KEY + '_albumart');
                const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

                // console.log('Cache check:', {
                //     cachedData,
                //     cachedAlbumArt,
                //     cacheTimestamp
                // });

                if (cachedData && cacheTimestamp) {
                    const age = Date.now() - parseInt(cacheTimestamp);

                    // If cache is still valid (less than 1 hour old)
                    if (age < CACHE_DURATION) {
                        // console.log('Using cached recent song data');
                        setScrollText(cachedData);
                        if (cachedAlbumArt) {
                            setAlbumArt(cachedAlbumArt);
                        }
                        setLoading(false);
                        return true;
                    }
                }
            } catch (err) {
                console.warn('Error reading cache:', err);
            }
            return false;
        };

        // If cache is valid, use it and don't fetch
        if (checkCache()) {
            return;
        }

        // Otherwise, fetch fresh data
        const fetchRecentTrack = async () => {
            try {
                const response = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${USERNAME}&api_key=${API_KEY}&limit=1&format=json`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch recent track');
                }

                const data = await response.json();
                const track = data.recenttracks.track[0];

                // Format: "Artist - Song Title • Album"
                const artist = track.artist['#text'] || track.artist;
                const song = track.name;
                const album = track.album?.['#text'] || '';
                const albumArtUrl = track.image[3]['#text']; // extralarge (300x300)

                const formattedText = album
                    ? `${artist} - ${song}  /  ${album}`
                    : `${artist} - ${song}`;

                setScrollText(formattedText);
                setAlbumArt(albumArtUrl);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, formattedText);
                    localStorage.setItem(CACHE_KEY + '_albumart', albumArtUrl);
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                    // console.log('Recent song cached successfully');
                } catch (err) {
                    console.warn('Error caching data:', err);
                }
            } catch (err) {
                console.error('Error fetching recent track:', err);
                setLoading(false);
            }
        };

        fetchRecentTrack();
    }, [API_KEY, USERNAME, CACHE_DURATION, CACHE_KEY, CACHE_TIMESTAMP_KEY]);

    // Measure the width of the scrolling text after it loads
    useEffect(() => {
        if (textRef.current && scrollText) {
            // Get the width of a single instance of the text (including padding)
            const singleTextWidth = textRef.current.scrollWidth / 4; // Divided by 4 since we repeat 4 times
            setScrollWidth(singleTextWidth);
        }
    }, [scrollText]);

    if (loading) {
        return (
            <div className="w-full overflow-hidden py-1 md:py-3 xl:py-4">
                <p className="text-5xs xs:text-5xs md:text-xs lg:text-base xl:text-base 2xl:text-lg 3xl:text-2xl 4xl:text-3xl">
                    Loading...
                </p>
            </div>
        );
    }

    if (!scrollText) {
        return null;
    }

    return (
        <div className="flex flex-col items-center w-full overflow-hidden">
            <div className="w-full font-bold lowercase text-[4.5vh] md:text-[5vh] xl:text-[3.5vw]
                px-[2vh] xl:px-[2vw] mb-[5vh] md:mb-[4vh] xl:mb-[3vw]">
                <p className="leading-none">Most recently listened to:</p>
            </div>
            <motion.div
                ref={textRef}
                className="flex whitespace-pre"
                animate={{
                    x: scrollWidth ? [0, -scrollWidth] : [0, -1920],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Repeat text multiple times for seamless loop */}
                <span className="px-[3.5vh] xl:px-[2.5vw]">{scrollText}</span>
                <span className="px-[3.5vh] xl:px-[2.5vw]">{scrollText}</span>
                <span className="px-[3.5vh] xl:px-[2.5vw]">{scrollText}</span>
                <span className="px-[3.5vh] xl:px-[2.5vw]">{scrollText}</span>
            </motion.div>
        </div>
    );
};

RecentSongScroll.propTypes = {
    enableCursorHover: PropTypes.bool
}

export default RecentSongScroll;