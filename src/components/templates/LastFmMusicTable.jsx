import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomTable from './CustomTable';

// Artist normalization
const getCanonicalArtistName = (name) => {
    return name.trim().toLowerCase().replace(/^the\s+/i, '');
};

const artistNameMap = {
    'smashing pumpkins': 'The Smashing Pumpkins',

};

const normalizeArtistName = (name) => {
    const canonical = getCanonicalArtistName(name);
    return artistNameMap[canonical] || name.trim();
};

// Utility: chunk array for controlled concurrency
const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );

const LastFmMusicTable = ({ musicData: propMusicData = null, viewMode = 'albums' }) => {
    const [musicData, setMusicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const albumArtCache = useRef(new Map());

    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

    const tableHeadings = viewMode === 'albums'
        ? ['No.', 'Artist', 'Album', 'Genre (subjective)']
        : ['No.', 'Artist', 'Song', 'Album'];

    const CACHE_DURATION = 24 * 60 * 60 * 1000;

    const preloadImages = (data) => {
        return Promise.all(
            data.map((item) => {
                return new Promise((resolve) => {
                    const imageUrl =
                        viewMode === 'albums' ? item.albumArt : item.trackImage;

                    if (!imageUrl || albumArtCache.current.has(imageUrl)) {
                        resolve();
                        return;
                    }

                    const img = new Image();

                    img.onload = () => {
                        albumArtCache.current.set(imageUrl, true);
                        resolve();
                    };

                    img.onerror = () => resolve();

                    img.src = imageUrl;
                });
            })
        );
    };

    useEffect(() => {
        const CACHE_KEY = `lastfm_${viewMode}_data`;
        const CACHE_TIMESTAMP_KEY = `lastfm_${viewMode}_cache_timestamp`;

        setLoading(true);
        setError(null);

        if (propMusicData) {
            preloadImages(propMusicData).then(() => {
                setMusicData(propMusicData);
                setLoading(false);
            });
            return;
        }

        if (!API_KEY || !USERNAME) {
            setError('Missing Last.fm API credentials.');
            setLoading(false);
            return;
        }

        const checkCache = async () => {
            try {
                const cachedData = localStorage.getItem(CACHE_KEY);
                const cacheTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

                if (cachedData && cacheTimestamp) {
                    const age = Date.now() - parseInt(cacheTimestamp);

                    if (age < CACHE_DURATION) {
                        const parsedData = JSON.parse(cachedData);
                        await preloadImages(parsedData);
                        setMusicData(parsedData);
                        setLoading(false);
                        return true;
                    }
                }
            } catch (err) {
                console.warn('Cache read error:', err);
            }
            return false;
        };

        const fetchTopAlbums = async () => {
            try {
                const res = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums&user=${USERNAME}&period=1month&limit=15&api_key=${API_KEY}&format=json`
                );

                if (!res.ok) throw new Error();

                const data = await res.json();
                const albums = data.topalbums.album;

                const formattedData = [];

                for (const group of chunk(albums, 5)) {
                    const results = await Promise.all(
                        group.map(async (album, indexOffset) => {
                            const index = formattedData.length + indexOffset;
                            let genre = 'unknown';

                            try {
                                const infoRes = await fetch(
                                    `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}&api_key=${API_KEY}&format=json`
                                );

                                if (infoRes.ok) {
                                    const infoData = await infoRes.json();
                                    const tags = infoData.album?.tags?.tag || [];

                                    if (tags.length > 0) {
                                        genre = tags
                                            .slice(0, 2)
                                            .map(tag => tag.name)
                                            .join(', ');
                                    }
                                }
                            } catch (err) {
                                console.warn(`Album info failed: ${album.name}`);
                            }

                            return {
                                no: `/${String(index + 1).padStart(2, '0')}`,
                                artist: normalizeArtistName(album.artist.name),
                                album: album.name,
                                genresubjective: genre,
                                albumArt: album.image[3]['#text'],
                            };
                        })
                    );

                    formattedData.push(...results);
                }

                await preloadImages(formattedData);

                const seen = new Set();
                const deduped = [];

                for (const item of formattedData) {
                    const key = `${item.artist.toLowerCase()}|||${item.album.toLowerCase()}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        deduped.push(item);
                    }
                }

                const top10 = deduped.slice(0, 10).map((item, i) => ({
                    ...item,
                    no: `/${String(i + 1).padStart(2, '0')}`
                }));

                setMusicData(top10);
                setLoading(false);

                localStorage.setItem(CACHE_KEY, JSON.stringify(top10));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            } catch {
                setError('Unable to load music data.');
                setLoading(false);
            }
        };

        const fetchTopTracks = async () => {
            try {
                const res = await fetch(
                    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${USERNAME}&period=1month&limit=15&api_key=${API_KEY}&format=json`
                );

                if (!res.ok) throw new Error();

                const data = await res.json();
                const tracks = data.toptracks.track;

                const formattedData = [];

                for (const group of chunk(tracks, 5)) {
                    const results = await Promise.all(
                        group.map(async (track, indexOffset) => {
                            const index = formattedData.length + indexOffset;
                            let albumName = 'Unknown Album';
                            let trackImage = '';

                            try {
                                const infoRes = await fetch(
                                    `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&api_key=${API_KEY}&format=json`
                                );

                                if (infoRes.ok) {
                                    const infoData = await infoRes.json();

                                    albumName = infoData.track?.album?.title || 'Unknown Album';

                                    const images =
                                        infoData.track?.album?.image || track.image;

                                    if (images?.length > 0) {
                                        trackImage = images[3]['#text'];
                                    }
                                }
                            } catch {
                                console.warn(`Track info failed: ${track.name}`);
                            }

                            return {
                                no: `/${String(index + 1).padStart(2, '0')}`,
                                artist: normalizeArtistName(track.artist.name),
                                song: track.name,
                                album: albumName,
                                trackImage,
                            };
                        })
                    );

                    formattedData.push(...results);
                }

                await preloadImages(formattedData);

                const seen = new Set();
                const deduped = [];

                for (const item of formattedData) {
                    const key = `${item.artist.toLowerCase()}|||${item.song.toLowerCase()}`;
                    if (!seen.has(key)) {
                        seen.add(key);
                        deduped.push(item);
                    }
                }

                const top10 = deduped.slice(0, 10).map((item, i) => ({
                    ...item,
                    no: `/${String(i + 1).padStart(2, '0')}`
                }));

                setMusicData(top10);
                setLoading(false);

                localStorage.setItem(CACHE_KEY, JSON.stringify(top10));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
            } catch {
                setError('Unable to load music data.');
                setLoading(false);
            }
        };

        const init = async () => {
            const cached = await checkCache();
            if (cached) return;

            if (viewMode === 'albums') {
                await fetchTopAlbums();
            } else {
                await fetchTopTracks();
            }
        };

        init();
    }, [API_KEY, USERNAME, propMusicData, viewMode]);

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
                <p>{error}</p>
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