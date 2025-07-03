import { useState, useEffect } from 'react';
import HalftoneOverlayShader from './shaders/HalftoneOverlay.jsx';
import {getCounter, incrementCounter} from "../Utils.jsx";

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
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);

    // Separate function to fetch image WITHOUT incrementing counter
    const fetchRandomImage = async () => {
        setLoading(true);

        // Try category method first
        // let result = await getRandomCategoryImage();
        // if (result) {
        //     setImageUrl(result.url);
        //     setImageTitle(result.title);
        //     setImageSource('commons');
        //     setLoading(false);
        //     return;
        // }

        // Fallback to random article
        let result = await getRandomWikipediaImage();
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

    // Combined function to handle both image fetch and counter increment
    const handleImageClickAndCount = async () => {
        setLoading(true);
        setError(null);

        try {
            // First, increment the counter and get the new count
            const newCount = await incrementCounter();

            if (newCount !== null) {
                setCount(newCount);
            } else {
                setError('Failed to increment counter');
            }

            // Then fetch the new image
            await fetchRandomImage();

        } catch (error) {
            console.error('Error in handleImageClickAndCount:', error);
            setError('Something went wrong');
            setLoading(false);
        }
    };

    // Load initial counter value
    useEffect(() => {
        const loadInitialData = async () => {
            // Load initial counter value
            const initialCount = await getCounter();
            if (initialCount !== null) {
                setCount(initialCount);
            }

            // Load initial image
            await fetchRandomImage();
        };

        loadInitialData();
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="relative flex flex-col items-center w-full">
            <div
                className="interact-shader aspect-square overflow-hidden w-full xl:w-[47vw] cursor-pointer relative group"
                onClick={handleImageClickAndCount}
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
                        <div
                            className="absolute inset-0 flex items-center justify-center text-customWhite bg-customBlack bg-opacity-30 z-20">
                            <span className="font-roboto font-normal lowercase text-[1vh] lg:text-[1vw] xl:text-[1vw]">Loading random image...</span>
                        </div>
                    )}
                </div>
            </div>

            {/*Screen width: 100vw*/}
            {/*Image width: 47vw (centered)*/}
            {/*Image position: starts at calc(50% - 23.5vw), ends at calc(50% + 23.5vw)*/}
            {/*Remaining space: from calc(50% + 23.5vw) to 100vw = calc(50% - 23.5vw) wide*/}

            <div
                className="hidden xl:flex absolute top-0 left-[calc(50%+23.5vw)] h-full w-[calc(50%-23.5vw)]
                    flex-col justify-center items-center xl:px-[2vw]
                    font-roboto font-light uppercase tracking-wide xl:text-[1vw] leading-relaxed">
                <p>This interactive visualization explores Wikipedia&#39;s vast collection of 7,017,489 English articles
                    (as of July 3, 2025)
                    <a
                        href={"https://en.wikipedia.org/wiki/Wikipedia:Size_of_Wikipedia"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="xl:text-[0.5vw] hover:opacity-80 transition-opacity"
                    >
                        <span> (source↗)</span>
                    </a>
                    . It retrieves a random Wikipedia article and displays its first image
                    <a
                        href={"https://en.wikipedia.org/api/rest_v1/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="xl:text-[0.5vw] hover:opacity-80 transition-opacity"
                    >
                        <span> (source↗)</span>
                    </a>
                    . Click the image to load another random article and its image.
                    A click counter on the opposite side tracks how many times a new image was generated.
                    Click on the image caption to navigate to the corresponding Wikipedia page.
                </p>
            </div>

            {/* Counter for xl screens*/}
            <div
                className="hidden xl:flex absolute top-0 right-[calc(50%+23.5vw)] h-full w-[calc(50%-23.5vw)]
                    flex-col justify-center items-center xl:pr-3.5 4xl:pr-8 7xl:pr-10
                    font-neueHaasGrotesk font-bold xl:text-[2vw]">
                <p>/{count.toString().padStart(2, '0')}</p>
                {error && <p className="text-[1vw]">{error}</p>}
            </div>

            {/* UI Controls - Image title only */}
            <div
                className="font-roboto font-light uppercase tracking-wide text-[1vh] lg:text-[1vw] xl:text-[1vw] mt-[1vh]">
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
                        {imageTitle.replace('File:', '').replace(/\.(jpg|png|jpeg|gif|webp)$/i, '')} ↗
                    </a>
                )}
            </div>
        </div>
    );
};

export default RandomImageHalftone;