import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomTable from './CustomTable';

const LastFmMusicTable = ({ musicData: propMusicData = null }) => {
    const [musicData, setMusicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API configuration
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

    // Table configuration
    const tableHeadings = ['No.', 'Artist', 'Title / Year', 'Genre (subjective)'];

    // Cache configuration
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hour in milliseconds
    const CACHE_KEY = 'lastfm_music_data';
    const CACHE_TIMESTAMP_KEY = 'lastfm_cache_timestamp';

    useEffect(() => {
        // If musicData is passed as prop, use it directly
        if (propMusicData) {
            setMusicData(propMusicData);
            setLoading(false);
            return;
        }

        // Check if credentials are available
        if (!API_KEY || !USERNAME) {
            setError('Missing Last.fm API credentials. Please check your .env file.');
            setLoading(false);
            return;
        }

        // Check if we have valid cached data
        const checkCache = () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

                if (cachedData && cacheTimestamp) {
                    const age = Date.now() - parseInt(cacheTimestamp);

                    // If cache is still valid (less than 1 hour old)
                    if (age < CACHE_DURATION) {
                        // console.log('Using cached Last.fm data');
                        setMusicData(JSON.parse(cachedData));
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
        const fetchTopAlbums = async () => {
            try {
                // Fetch top albums
                const albumsResponse = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${USERNAME}&period=1month&limit=10&api_key=${API_KEY}&format=json`
                );

                if (!albumsResponse.ok) {
                    throw new Error('Failed to fetch albums');
                }

                const albumsData = await albumsResponse.json();
                const albums = albumsData.topalbums.album;

                // Fetch genre/tags and year for each album
                const formattedData = await Promise.all(
                    albums.map(async (album, index) => {
                        let genre = 'unknown';
                        let year = '';

                        try {
                            // Fetch album info to get tags (genres) and release date
                            const infoResponse = await fetch(
                                `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}&api_key=${API_KEY}&format=json`
                            );

                            if (infoResponse.ok) {
                                const infoData = await infoResponse.json();

                                // Get genres from tags
                                const tags = infoData.album?.tags?.tag || [];
                                if (tags.length > 0) {
                                    genre = tags
                                        .slice(0, 2)
                                        .map(tag => tag.name)
                                        .join(', ');
                                }

                                // Get release year from wiki.published field
                                // Format: "01 Jan 2020, 00:00" or similar
                                const publishedDate = infoData.album?.wiki?.published;
                                if (publishedDate) {
                                    const yearMatch = publishedDate.match(/\d{4}/);
                                    if (yearMatch) {
                                        year = yearMatch[0];
                                    }
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch info for ${album.name}:`, err);
                        }

                        return {
                            no: `/${String(index + 1).padStart(2, '0')}`,
                            artist: album.artist.name,
                            titleyear: year ? `${album.name} (${year})` : album.name,
                            genresubjective: genre,
                            albumArt: album.image[3]['#text'], // extralarge (300x300)
                        };
                    })
                );

                setMusicData(formattedData);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                    // console.log('Last.fm data cached successfully');
                } catch (err) {
                    console.warn('Error caching data:', err);
                }
            } catch (err) {
                console.error('Error fetching Last.fm data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTopAlbums();
    }, [API_KEY, USERNAME, CACHE_DURATION, CACHE_KEY, CACHE_TIMESTAMP_KEY, propMusicData]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-[30vw] text-center px-3.5 py-10">
                <p>Loading my top 10 albums of the month...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center w-full h-[30vw] text-center px-3.5 py-10">
                <p>Error loading music data: {error}</p>
            </div>
        );
    }

    return (
        <CustomTable
            data={musicData}
            headings={tableHeadings}
            imageField="albumArt"
            enableCursorHover={true}
        />
    );
};

LastFmMusicTable.propTypes = {
    musicData: PropTypes.arrayOf(
        PropTypes.shape({
            no: PropTypes.string.isRequired,
            artist: PropTypes.string.isRequired,
            titleyear: PropTypes.string.isRequired,
            genresubjective: PropTypes.string.isRequired,
            albumArt: PropTypes.string.isRequired,
        })
    ),
};

export default LastFmMusicTable;