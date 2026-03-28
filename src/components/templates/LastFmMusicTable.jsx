import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CustomTable from './CustomTable';

// Fetch with timeout — rejects after `ms` milliseconds
const fetchWithTimeout = (url, options = {}, ms = 3000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { ...options, signal: controller.signal })
        .finally(() => clearTimeout(timer));
};

// Artist name normalization utilities
const getCanonicalArtistName = (name) => {
    return name.trim().toLowerCase().replace(/^the\s+/i, '');
};

// Map canonical names to preferred display names
// Add artists as variations are discovered
const artistNameMap = {
    'smashing pumpkins': 'The Smashing Pumpkins',
};

const normalizeArtistName = (name) => {
    const canonical = getCanonicalArtistName(name);
    return artistNameMap[canonical] || name.trim();
};

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

    // MusicBrainz timeout — keep well under your 3s total budget.
    // Each MB request gets 1.5s before we give up and move on.
    const MB_TIMEOUT_MS = 1500;

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

        // Helper: fetch release year from MusicBrainz with a hard timeout.
        // Returns the year string on success, or '' on any failure/timeout.
        const fetchMBYear = async (mbid, label) => {
            try {
                const mbResponse = await fetchWithTimeout(
                    `https://corsproxy.io/?${encodeURIComponent(`https://musicbrainz.org/ws/2/release/${mbid}?inc=release-groups&fmt=json`)}`,
                    { headers: { 'User-Agent': 'JooEonParkPortfolio/1.0 (jooeon427@gmail.com)' } },
                    MB_TIMEOUT_MS
                );

                if (!mbResponse.ok) return '';

                const mbData = await mbResponse.json();
                const releaseDate = mbData['release-group']?.['first-release-date'];
                return releaseDate ? releaseDate.split('-')[0] : '';
            } catch (mbErr) {
                // AbortError = timeout; TypeError = network failure — skip either way
                console.warn(`MusicBrainz lookup skipped for ${label}:`, mbErr.name || mbErr.message);
                return '';
            }
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
                // Fetch top albums - get extra to account for duplicates after normalization
                const albumsResponse = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${USERNAME}&period=1month&limit=15&api_key=${API_KEY}&format=json`
                );

                if (!albumsResponse.ok) {
                    throw new Error('Failed to fetch albums');
                }

                const albumsData = await albumsResponse.json();
                const albums = albumsData.topalbums.album;

                // Fetch genre/tags and year for each album in parallel (no more sequential 1s delays)
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
                                    year = await fetchMBYear(mbid, album.name);
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch info for ${album.name}:`, err);
                        }

                        return {
                            no: `/${String(index + 1).padStart(2, '0')}`,
                            artist: normalizeArtistName(album.artist.name),
                            albumyear: year ? `${album.name} (${year})` : album.name,
                            genresubjective: genre,
                            albumArt: album.image[3]['#text'], // extralarge (300x300)
                        };
                    })
                );

                // Preload all album art images before showing the data
                await preloadImages(formattedData);

                // Deduplicate based on artist + album combination
                const seen = new Map();
                const deduplicatedData = [];

                for (const item of formattedData) {
                    // Create a unique key combining normalized artist and album name (without year)
                    const albumNameWithoutYear = item.albumyear.replace(/\s*\(\d{4}\)\s*$/, '');
                    const key = `${item.artist.toLowerCase()}|||${albumNameWithoutYear.toLowerCase()}`;

                    if (!seen.has(key)) {
                        seen.set(key, item);
                        deduplicatedData.push(item);
                    } else {
                        // If we've seen this album before, prefer the one with more data
                        const existing = seen.get(key);

                        // Prefer entry with genre data over "unknown"
                        if (existing.genresubjective === 'unknown' && item.genresubjective !== 'unknown') {
                            seen.set(key, item);
                            const index = deduplicatedData.findIndex(d => d === existing);
                            deduplicatedData[index] = item;
                        }
                        // Prefer entry with year data
                        else if (!existing.albumyear.includes('(') && item.albumyear.includes('(')) {
                            seen.set(key, item);
                            const index = deduplicatedData.findIndex(d => d === existing);
                            deduplicatedData[index] = item;
                        }
                    }
                }

                // Take only top 10 after deduplication and renumber
                const top10Data = deduplicatedData.slice(0, 10).map((item, index) => ({
                    ...item,
                    no: `/${String(index + 1).padStart(2, '0')}`
                }));

                setMusicData(top10Data);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(top10Data));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
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
                // Fetch top tracks - get extra to account for duplicates after normalization
                const tracksResponse = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&period=1month&limit=15&api_key=${API_KEY}&format=json`
                );

                if (!tracksResponse.ok) {
                    throw new Error('Failed to fetch tracks');
                }

                const tracksData = await tracksResponse.json();
                const tracks = tracksData.toptracks.track;

                // Format track data — all tracks fetched in parallel
                const formattedData = await Promise.all(
                    tracks.map(async (track, index) => {
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
                                            year = await fetchMBYear(mbid, track.name);
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch info for ${track.name}:`, err);
                        }

                        return {
                            no: `/${String(index + 1).padStart(2, '0')}`,
                            artist: normalizeArtistName(track.artist.name),
                            song: track.name,
                            albumyear: year ? `${albumName} (${year})` : albumName,
                            trackImage: trackImage,
                        };
                    })
                );

                // Preload all track images before showing the data
                await preloadImages(formattedData);

                // Deduplicate based on artist + song combination
                const seen = new Map();
                const deduplicatedData = [];

                for (const item of formattedData) {
                    const key = `${item.artist.toLowerCase()}|||${item.song.toLowerCase()}`;

                    if (!seen.has(key)) {
                        seen.set(key, item);
                        deduplicatedData.push(item);
                    } else {
                        const existing = seen.get(key);

                        // Prefer entry with album year data
                        if (!existing.albumyear.includes('(') && item.albumyear.includes('(')) {
                            seen.set(key, item);
                            const index = deduplicatedData.findIndex(d => d === existing);
                            deduplicatedData[index] = item;
                        }
                        // Prefer entry with album name over "Unknown Album"
                        else if (existing.albumyear === 'Unknown Album' && item.albumyear !== 'Unknown Album') {
                            seen.set(key, item);
                            const index = deduplicatedData.findIndex(d => d === existing);
                            deduplicatedData[index] = item;
                        }
                    }
                }

                // Take only top 10 after deduplication and renumber
                const top10Data = deduplicatedData.slice(0, 10).map((item, index) => ({
                    ...item,
                    no: `/${String(index + 1).padStart(2, '0')}`
                }));

                setMusicData(top10Data);
                setLoading(false);

                // Cache the data
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(top10Data));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
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
            viewMode={viewMode}
        />
    );
};

LastFmMusicTable.propTypes = {
    musicData: PropTypes.array,
    viewMode: PropTypes.oneOf(['albums', 'songs']).isRequired,
};

export default LastFmMusicTable;