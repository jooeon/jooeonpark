import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomTable from './CustomTable';

const LastFmMusicTable = ({ musicData: propMusicData = null, viewMode = 'albums' }) => {
    const [musicData, setMusicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API configuration
    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

    // Table configuration - changes based on viewMode
    // These headings need to match the data keys which are formatted versions of the headings
    // e.g. No. -> no, Album (year) -> albumyear
    const tableHeadings = viewMode === 'albums'
        ? ['No.', 'Artist', 'Album (year)', 'Genre (subjective)']
        : ['No.', 'Artist', 'Song', 'Album (year)'];

    // Cache configuration
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    const CACHE_KEY = `lastfm_${viewMode}_data`;
    const CACHE_TIMESTAMP_KEY = `lastfm_${viewMode}_cache_timestamp`;

    // Create a global image cache to prevent re-fetching
    useEffect(() => {
        if (!window.albumArtCache) {
            window.albumArtCache = new Map();
        }
    }, []);

    // Aggressive image preloading with multiple strategies
    const preloadImages = (data) => {
        return Promise.all(
            data.map((item) => {
                return new Promise((resolve) => {
                    const imageUrl = viewMode === 'albums' ? item.albumArt : item.trackImage;

                    if (!imageUrl) {
                        resolve();
                        return;
                    }

                    // Check if already in cache
                    if (window.albumArtCache.has(imageUrl)) {
                        resolve();
                        return;
                    }

                    const img = new Image();

                    img.onload = () => {
                        // Store in global cache
                        window.albumArtCache.set(imageUrl, img);

                        // Force the image into browser cache by rendering it off-screen
                        const hiddenImg = document.createElement('img');
                        hiddenImg.src = imageUrl;
                        hiddenImg.style.position = 'absolute';
                        hiddenImg.style.left = '-9999px';
                        hiddenImg.style.width = '1px';
                        hiddenImg.style.height = '1px';
                        document.body.appendChild(hiddenImg);

                        // console.log(`Cached: ${item.artist}`);
                        resolve();
                    };

                    img.onerror = () => {
                        console.warn(`Failed to cache image for: ${item.artist}`);
                        resolve(); // Resolve anyway to not block other images
                    };

                    // Important: Don't use crossOrigin for Last.fm images as it may cause issues
                    img.src = imageUrl;
                });
            })
        );
    };

    useEffect(() => {
        // Reset state when viewMode changes
        setLoading(true);
        setError(null);

        // If musicData is passed as prop, use it directly
        if (propMusicData) {
            preloadImages(propMusicData).then(() => {
                setMusicData(propMusicData);
                setLoading(false);
            });
            return;
        }

        // Check if credentials are available
        if (!API_KEY || !USERNAME) {
            setError('Missing Last.fm API credentials. Please check your .env file.');
            setLoading(false);
            return;
        }

        // Check if we have valid cached data
        const checkCache = async () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

                if (cachedData && cacheTimestamp) {
                    const age = Date.now() - parseInt(cacheTimestamp);

                    // If cache is still valid (less than 24 hours old)
                    if (age < CACHE_DURATION) {
                        const parsedData = JSON.parse(cachedData);

                        // Preload images before showing data
                        await preloadImages(parsedData);

                        console.log(`Using cached Last.fm ${viewMode} data with preloaded images`);
                        setMusicData(parsedData);
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
        const initializeData = async () => {
            const cacheValid = await checkCache();
            if (cacheValid) {
                return;
            }

            // Otherwise, fetch fresh data
            if (viewMode === 'albums') {
                await fetchTopAlbums();
            } else {
                await fetchTopTracks();
            }
        };

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
                            // Fetch album info from Last.fm to get tags (genres)
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

                                // Try to get year from MusicBrainz if MBID exists
                                const mbid = infoData.album?.mbid || album.mbid;
                                if (mbid) {
                                    try {
                                        // Add delay to respect MusicBrainz rate limit (1 req/sec)
                                        await new Promise(resolve => setTimeout(resolve, 1000));

                                        const mbResponse = await fetch(
                                            `https://corsproxy.io/?${encodeURIComponent(`https://musicbrainz.org/ws/2/release/${mbid}?inc=release-groups&fmt=json`)}`,
                                            {
                                                headers: {
                                                    'User-Agent': 'JooEonParkPortfolio/1.0 (jooeon427@gmail.com)'
                                                }
                                            }
                                        );

                                        if (mbResponse.ok) {
                                            const mbData = await mbResponse.json();
                                            const releaseDate = mbData['release-group']?.['first-release-date'];
                                            if (releaseDate) {
                                                year = releaseDate.split('-')[0];
                                            }
                                        }
                                    } catch (mbErr) {
                                        console.warn(`MusicBrainz lookup failed for ${album.name}:`, mbErr);
                                    }
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch info for ${album.name}:`, err);
                        }

                        return {
                            no: `/${String(index + 1).padStart(2, '0')}`,
                            artist: album.artist.name,
                            albumyear: year ? `${album.name} (${year})` : album.name,
                            genresubjective: genre,
                            albumArt: album.image[3]['#text'], // extralarge (300x300)
                        };
                    })
                );

                // Preload all album art images before showing the data
                await preloadImages(formattedData);

                setMusicData(formattedData);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                    console.log('Last.fm albums data cached successfully');
                } catch (err) {
                    console.warn('Error caching data:', err);
                }
            } catch (err) {
                console.error('Error fetching Last.fm data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        const fetchTopTracks = async () => {
            try {
                // Fetch top tracks
                const tracksResponse = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&period=1month&limit=10&api_key=${API_KEY}&format=json`
                );

                if (!tracksResponse.ok) {
                    throw new Error('Failed to fetch tracks');
                }

                const tracksData = await tracksResponse.json();
                const tracks = tracksData.toptracks.track;

                // Format track data
                const formattedData = await Promise.all(
                    tracks.map(async (track, index) => {
                        // Fetch track info to get album details and image
                        let albumName = 'Unknown Album';
                        let trackImage = '';
                        let year = '';

                        try {
                            const infoResponse = await fetch(
                                `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&api_key=${API_KEY}&format=json`
                            );

                            if (infoResponse.ok) {
                                const infoData = await infoResponse.json();
                                albumName = infoData.track?.album?.title || 'Unknown Album';

                                // Get image from track info
                                const images = infoData.track?.album?.image || track.image;
                                if (images && images.length > 0) {
                                    trackImage = images[3]['#text']; // extralarge (300x300)
                                }

                                // Now fetch album info to get MBID
                                if (albumName !== 'Unknown Album') {
                                    const albumInfoResponse = await fetch(
                                        `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(track.artist.name)}&album=${encodeURIComponent(albumName)}&api_key=${API_KEY}&format=json`
                                    );

                                    if (albumInfoResponse.ok) {
                                        const albumInfoData = await albumInfoResponse.json();
                                        const mbid = albumInfoData.album?.mbid;

                                        if (mbid) {
                                            try {
                                                // Add delay to respect MusicBrainz rate limit (1 req/sec)
                                                await new Promise(resolve => setTimeout(resolve, 1000));

                                                const mbResponse = await fetch(
                                                    `https://corsproxy.io/?${encodeURIComponent(`https://musicbrainz.org/ws/2/release/${mbid}?inc=release-groups&fmt=json`)}`,
                                                    {
                                                        headers: {
                                                            'User-Agent': 'JooEonParkPortfolio/1.0 (jooeon427@gmail.com)'
                                                        }
                                                    }
                                                );

                                                if (mbResponse.ok) {
                                                    const mbData = await mbResponse.json();
                                                    const releaseDate = mbData['release-group']?.['first-release-date'];
                                                    if (releaseDate) {
                                                        year = releaseDate.split('-')[0];
                                                    }
                                                }
                                            } catch (mbErr) {
                                                console.warn(`MusicBrainz lookup failed for ${track.name}:`, mbErr);
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch info for ${track.name}:`, err);
                        }

                        return {
                            no: `/${String(index + 1).padStart(2, '0')}`,
                            artist: track.artist.name,
                            song: track.name,
                            albumyear: year ? `${albumName} (${year})` : albumName,
                            trackImage: trackImage,
                        };
                    })
                );

                // Preload all track images before showing the data
                await preloadImages(formattedData);

                setMusicData(formattedData);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                    console.log('Last.fm tracks data cached successfully');
                } catch (err) {
                    console.warn('Error caching data:', err);
                }
            } catch (err) {
                console.error('Error fetching Last.fm tracks data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        initializeData();
    }, [API_KEY, USERNAME, CACHE_DURATION, CACHE_KEY, CACHE_TIMESTAMP_KEY, propMusicData, viewMode]);

    if (loading) {
        return (
            <div className="flex justify-center items-center w-full h-[30vw] text-center px-3.5 py-10">
                <p>Loading my top 10 {viewMode} of the month...</p>
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
            imageField={viewMode === 'albums' ? 'albumArt' : 'trackImage'}
            enableCursorHover={true}
        />
    );
};

LastFmMusicTable.propTypes = {
    musicData: PropTypes.array,
    viewMode: PropTypes.oneOf(['albums', 'songs']).isRequired,
};

export default LastFmMusicTable;