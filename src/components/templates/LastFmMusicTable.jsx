import { useEffect, useState } from 'react';
import CustomTable from './CustomTable';

const LastFmMusicTable = () => {
    const [musicData, setMusicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
    const USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

    const tableHeadings = ['No.', 'Artist', 'Title/Year', 'Genre (subjective)'];

    useEffect(() => {
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

                // Fetch genre/tags for each album
                const formattedData = await Promise.all(
                    albums.map(async (album, index) => {
                        let genre = 'Unknown';

                        try {
                            // Fetch album info to get tags (genres)
                            const infoResponse = await fetch(
                                `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(album.artist.name)}&album=${encodeURIComponent(album.name)}&api_key=${API_KEY}&format=json`
                            );

                            if (infoResponse.ok) {
                                const infoData = await infoResponse.json();
                                const tags = infoData.album?.tags?.tag || [];

                                // Get top 2-3 genres
                                if (tags.length > 0) {
                                    genre = tags
                                        .slice(0, 3)
                                        .map(tag => tag.name)
                                        .join(', ');
                                }
                            }
                        } catch (err) {
                            console.warn(`Could not fetch genre for ${album.name}:`, err);
                        }

                        // Extract year from the album name if it exists (e.g., "Album Name (2020)")
                        // Or you could fetch this from album.getInfo as well
                        const yearMatch = album.name.match(/\((\d{4})\)/);
                        const year = yearMatch ? yearMatch[1] : '';

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
            } catch (err) {
                console.error('Error fetching Last.fm data:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchTopAlbums();
    }, [API_KEY, USERNAME]);

    // Add error checking
    if (!API_KEY || !USERNAME) {
        console.error('Missing Last.fm credentials in .env file');
        return <div>Error: Missing API credentials</div>;
    }

    if (loading) {
        return (
            <div className="w-full text-center py-10">
                <p>Loading top albums...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full text-center py-10">
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

export default LastFmMusicTable;