import { useState, useEffect } from 'react';
import HalftoneOverlayShader from './shaders/HalftoneOverlay.jsx';

// Wikipedia image fetcher functions (embedded for demo)
const getRandomCategoryImage = async () => {
    const categories = [
        'Featured_pictures_on_Wikimedia_Commons',
        'Quality_images_on_Wikimedia_Commons',
        'Pictures_of_the_day_(Wikimedia_Commons)',
        'Art_photographs',
        'Nature_photographs'
    ];

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    try {
        const response = await fetch(
            `https://commons.wikimedia.org/w/api.php?` +
            `action=query&format=json&origin=*&list=categorymembers&cmtitle=Category:${randomCategory}&cmlimit=50&cmtype=file`
        );
        const data = await response.json();

        // Check if we got valid results
        if (!data.query || !data.query.categorymembers || data.query.categorymembers.length === 0) {
            console.warn('No category members found for:', randomCategory);
            return null;
        }

        const files = data.query.categorymembers;

        // Try multiple random files in case some fail
        for (let attempt = 0; attempt < Math.min(5, files.length); attempt++) {
            const randomFile = files[Math.floor(Math.random() * files.length)];

            // Ensure the random file has a title
            if (!randomFile || !randomFile.title) {
                continue;
            }

            try {
                const imageResponse = await fetch(
                    `https://commons.wikimedia.org/w/api.php?` +
                    `action=query&format=json&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=640&titles=${encodeURIComponent(randomFile.title)}`
                );
                const imageData = await imageResponse.json();

                // Check if we got valid image data
                if (!imageData.query || !imageData.query.pages) {
                    continue;
                }

                const pages = Object.values(imageData.query.pages);
                const page = pages[0];

                // Ensure we have valid image info
                if (page && page.imageinfo && page.imageinfo[0] && (page.imageinfo[0].thumburl || page.imageinfo[0].url)) {
                    const info = page.imageinfo[0];
                    return {
                        url: info.thumburl || info.url,
                        title: randomFile.title
                    };
                }
            } catch (imageError) {
                console.warn('Failed to fetch image info for:', randomFile.title, imageError);
                continue;
            }
        }

        console.warn('All attempts failed for category:', randomCategory);
        return null;

    } catch (error) {
        console.error('Category API request failed:', error);
        return null;
    }
};

const getRandomWikipediaImage = async () => {
    try {
        const response = await fetch(
            'https://en.wikipedia.org/api/rest_v1/page/random/summary'
        );
        const data = await response.json();

        if (data.thumbnail && data.thumbnail.source) {
            return {
                url: data.thumbnail.source,
                title: data.title
            };
        }
    } catch (error) {
        console.error('Failed to fetch Wikipedia image:', error);
    }

    return null;
};

const RandomImageHalftone = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [imageTitle, setImageTitle] = useState('');
    const [imageSource, setImageSource] = useState('commons'); // 'commons' or 'wikipedia'
    const [loading, setLoading] = useState(true);

    const fetchRandomImage = async () => {
        setLoading(true);

        // Try category method first
        let result = await getRandomCategoryImage();
        if (result) {
            setImageUrl(result.url);
            setImageTitle(result.title);
            setImageSource('commons');
            setLoading(false);
            return;
        }

        // Fallback to random article
        result = await getRandomWikipediaImage();
        if (result) {
            setImageUrl(result.url);
            setImageTitle(result.title);
            setImageSource('wikipedia');
            setLoading(false);
            return;
        }

        // Ultimate fallback
        setImageUrl('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/640px-Wikipedia-logo-v2.svg.png');
        setImageTitle('Wikipedia Logo');
        setImageSource('commons');
        setLoading(false);
    };

    useEffect(() => {
        fetchRandomImage();
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="flex flex-col items-center w-full">
            <div
                className="interact-shader aspect-square overflow-hidden w-full xl:w-[47vw] cursor-pointer relative group"
                onClick={fetchRandomImage}
            >
                <div className="inset-0 w-full h-full">
                    <HalftoneOverlayShader imageUrl={imageUrl}/>

                    {/* Hover overlay */}
                    {/*<div className="absolute inset-0 bg-customBlack bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">*/}
                    {/*    <span className="font-neueHaasGrotesk font-bold lowercase">*/}
                    {/*      next random image*/}
                    {/*    </span>*/}
                    {/*</div>*/}

                    {/* Loading indicator */}
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center text-customWhite bg-customBlack bg-opacity-30 z-20">
                            <span className="font-roboto font-normal lowercase text-[1vh] lg:text-[1vw] xl:text-[1vw]">Loading random image...</span>
                        </div>
                    )}

                    <button
                        onClick={fetchRandomImage}
                        disabled={loading}
                        className="absolute hover:opacity-70 transition-opacity disabled:opacity-50"
                    >
                        {loading ? 'Loading...' : 'Next Random Image'}
                    </button>
                </div>
            </div>

            {/* UI Controls - Image title only */}
            <div className="font-roboto font-light uppercase tracking-wide text-[1vh] lg:text-[1vw] xl:text-[1vw] mt-[1vh]">
                {imageTitle && (
                    <a
                        href={
                            imageSource === 'commons'
                                ? `https://commons.wikimedia.org/wiki/${encodeURIComponent(imageTitle)}`
                                : `https://en.wikipedia.org/wiki/${encodeURIComponent(imageTitle)}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                    >
                        {imageTitle.replace('File:', '').replace(/\.(jpg|png|jpeg|gif|webp)$/i, '')}
                    </a>
                )}
            </div>
        </div>
    );
};

export default RandomImageHalftone;