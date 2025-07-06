import { useState, useEffect } from 'react';
import HalftoneOverlayShader from './shaders/HalftoneOverlay.jsx';
import {getCounter, incrementCounter} from "../Utils.jsx";

// Wikipedia image fetcher functions (embedded for demo)
// const getRandomCategoryImage = async () => {
//     const categories = [
//         'Featured_pictures_on_Wikimedia_Commons',
//         'Quality_images_on_Wikimedia_Commons',
//         'Pictures_of_the_day_(Wikimedia_Commons)',
//         'Art_photographs',
//         'Nature_photographs'
//     ];
//
//     const randomCategory = categories[Math.floor(Math.random() * categories.length)];
//
//     try {
//         const response = await fetch(
//             `https://commons.wikimedia.org/w/api.php?` +
//             `action=query&format=json&origin=*&list=categorymembers&cmtitle=Category:${randomCategory}&cmlimit=50&cmtype=file`
//         );
//         const data = await response.json();
//
//         // Check if we got valid results
//         if (!data.query || !data.query.categorymembers || data.query.categorymembers.length === 0) {
//             console.warn('No category members found for:', randomCategory);
//             return null;
//         }
//
//         const files = data.query.categorymembers;
//
//         // Try multiple random files in case some fail
//         for (let attempt = 0; attempt < Math.min(5, files.length); attempt++) {
//             const randomFile = files[Math.floor(Math.random() * files.length)];
//
//             // Ensure the random file has a title
//             if (!randomFile || !randomFile.title) {
//                 continue;
//             }
//
//             try {
//                 const imageResponse = await fetch(
//                     `https://commons.wikimedia.org/w/api.php?` +
//                     `action=query&format=json&origin=*&prop=imageinfo&iiprop=url&iiurlwidth=640&titles=${encodeURIComponent(randomFile.title)}`
//                 );
//                 const imageData = await imageResponse.json();
//
//                 // Check if we got valid image data
//                 if (!imageData.query || !imageData.query.pages) {
//                     continue;
//                 }
//
//                 const pages = Object.values(imageData.query.pages);
//                 const page = pages[0];
//
//                 // Ensure we have valid image info
//                 if (page && page.imageinfo && page.imageinfo[0] && (page.imageinfo[0].thumburl || page.imageinfo[0].url)) {
//                     const info = page.imageinfo[0];
//                     return {
//                         url: info.thumburl || info.url,
//                         title: randomFile.title
//                     };
//                 }
//             } catch (imageError) {
//                 console.warn('Failed to fetch image info for:', randomFile.title, imageError);
//             }
//         }
//
//         console.warn('All attempts failed for category:', randomCategory);
//         return null;
//
//     } catch (error) {
//         console.error('Category API request failed:', error);
//         return null;
//     }
// };

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
    const [dotDensity, setDotDensity] = useState(80);
    const [baseColor, setBaseColor] = useState('#2DB5B4');
    // const [generatedShades, setGeneratedShades] = useState(generateShades('#2DB5B4'));
    const [invertBrightness, setInvertBrightness] = useState(false);
    const [settingsExpanded, setSettingsExpanded] = useState(false);

    // Update generated shades when base color changes
    // useEffect(() => {
    //     setGeneratedShades(generateShades(baseColor));
    // }, [baseColor]);

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
            // Increment counter on page load (since we're generating a new image)
            const newCount = await incrementCounter();
            if (newCount !== null) {
                setCount(newCount);
            } else {
                // Fallback: try to get current count if increment fails
                const initialCount = await getCounter();
                if (initialCount !== null) {
                    setCount(initialCount);
                }
            }

            // Load initial image
            await fetchRandomImage();
        };

        loadInitialData();
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="relative flex flex-col items-center gap-[2vh] w-full">
            <div
                className="interact-shader aspect-square overflow-hidden w-full xl:w-[45vw] cursor-pointer relative group"
                onClick={handleImageClickAndCount}
            >
                <div className="inset-0 w-full h-full">
                    <HalftoneOverlayShader
                        imageUrl={imageUrl}
                        gridSize={dotDensity}
                        baseColor={baseColor}
                        invertBrightness={invertBrightness}
                    />

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

            {/* Caption */}
            <div
                className="font-roboto font-light uppercase tracking-wide text-[1.5vh] lg:text-[1.75vw] xl:text-[1vw]">
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

            {/*Screen width: 100vw*/}
            {/*Image width: 47vw (centered)*/}
            {/*Image position: starts at calc(50% - 23.5vw), ends at calc(50% + 23.5vw)*/}
            {/*Remaining space: from calc(50% + 23.5vw) to 100vw = calc(50% - 23.5vw) wide*/}
            <div
                className="flex xl:absolute top-0 left-[calc(50%+23.5vw)] h-full w-full xl:w-[calc(50%-23.5vw)]
                    flex-col justify-center items-center xl:px-[2vw]
                    font-roboto font-light uppercase tracking-wide text-[1.25vh] lg:text-[1.5vw] xl:text-[1vw] leading-relaxed">
                <p>This interactive visualization explores Wikipedia&#39;s vast collection of 7,017,561 English articles
                    (as of July 3, 2025)
                    <a
                        href={"https://en.wikipedia.org/wiki/Wikipedia:Size_of_Wikipedia"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.75vh] lg:text-[1vw] xl:text-[0.5vw] hover:opacity-80 transition-opacity"
                    >
                        <span> (source↗)</span>
                    </a>
                    . It retrieves a random Wikipedia article and displays its first image
                    <a
                        href={"https://en.wikipedia.org/api/rest_v1/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.75vh] lg:text-[1vw] xl:text-[0.5vw] hover:opacity-80 transition-opacity"
                    >
                        <span> (source↗)</span>
                    </a>
                    . Click the image to load a new random article.
                    A click counter keeps a global count of the total number of images generated.
                    Click on the image caption to navigate to the corresponding Wikipedia page.
                </p>

                {/* Settings Dropdown */}
                <div className="flex flex-col  mt-6 w-full">
                    {/* Settings Toggle Button */}
                    <button
                        onClick={() => setSettingsExpanded(!settingsExpanded)}
                        className="flex items-center gap-2 w-fit font-neueHaasGrotesk font-bold lowercase text-[1.25vh] lg:text-[1.5vw] xl:text-[1vw] hover:opacity-80 transition-opacity"
                    >
                        <span>Settings</span>
                        <svg
                            viewBox="0 0 12 8"
                            fill="none"
                            className={`w-[0.75vh] h-[0.5vh] xl:w-[0.75vw] xl:h-[0.5vw] transition-transform duration-300 ${settingsExpanded ? 'rotate-180' : 'rotate-0'}`}
                        >
                            <path
                                d="M1 1L6 6L11 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {/* Collapsible Settings Panel */}
                    <div className={`w-1/2 xl:w-full overflow-hidden transition-all duration-300 ${settingsExpanded ? 'opacity-100' : 'max-h-0 opacity-0'}`}>
                        {/* Slider UI */}
                        <div className="mt-[2vh] w-full">
                            <label className="block mb-[1vh] text-[1vh] lg:text-[1.25vw] xl:text-[0.85vw]">
                                Dot Density: {dotDensity}
                            </label>
                            <input
                                type="range"
                                min="50"
                                max="150"
                                value={dotDensity}
                                onChange={(e) => setDotDensity(Number(e.target.value))}
                                className="range w-full bg-customGrayLight dark:bg-[#222222]"
                            />
                        </div>

                        {/* Color Picker UI */}
                        <div className="mt-[2vh] w-full">
                            <label className="block mb-[1vh] text-[1vh] lg:text-[1.25vw] xl:text-[0.85vw]">
                                Color Theme
                            </label>
                            <input
                                type="color"
                                value={baseColor}
                                onChange={(e) => setBaseColor(e.target.value)}
                                className="w-full h-[3vh] xl:h-[4vh] cursor-pointer border border-customWhite border-opacity-20 bg-customWhite dark:bg-customBlack"
                                style={{
                                    background: baseColor,
                                }}
                            />

                            {/* Color Palette Preview */}
                            {/*<div className="flex h-[1.5vh] xl:h-[2vh] mt-[1.5vh] overflow-hidden border border-customWhite border-opacity-20">*/}
                            {/*    {generatedShades.map((shade, i) => (*/}
                            {/*        <div*/}
                            {/*            key={i}*/}
                            {/*            className="flex-1 transition-all duration-200 hover:scale-y-110"*/}
                            {/*            style={{*/}
                            {/*                backgroundColor: rgbToHex(shade[0], shade[1], shade[2])*/}
                            {/*            }}*/}
                            {/*            title={`Shade ${i + 1}: ${rgbToHex(shade[0], shade[1], shade[2])}`}*/}
                            {/*        />*/}
                            {/*    ))}*/}
                            {/*</div>*/}

                            {/* Quick Color Presets */}
                            <div className="flex flex-wrap gap-[1vh] xl:gap-[0.5vw] mt-[1.5vh]">
                                {[
                                    { name: 'Teal', color: '#2DB5B4' },
                                    { name: 'Red', color: '#fc0834' },
                                    { name: 'Blue', color: '#4a21ff' },
                                    { name: 'Green', color: '#33ff57' },
                                    { name: 'Light-Blue', color: '#33c4ff' },
                                    { name: 'Purple', color: '#a633ff' },
                                    { name: 'Pink', color: '#ff33a1' },
                                    { name: 'Orange', color: '#ff5733' },
                                    { name: 'Yellow', color: '#ffef73' },
                                ].map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => setBaseColor(preset.color)}
                                        className={`w-[2.25vh] h-[2.25vh] xl:w-[1.5vw] xl:h-[1.5vw] border-2 transition-all duration-200 hover:scale-110 ${
                                            baseColor.toLowerCase() === preset.color.toLowerCase()
                                                ? 'border-customWhite border-opacity-80 scale-110'
                                                : 'border-customWhite border-opacity-30'
                                        }`}
                                        style={{ backgroundColor: preset.color }}
                                        title={`${preset.name} (${preset.color})`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Brightness Inversion Toggle */}
                        <div className="mt-[2vh] w-full">
                            <label className="block mb-[1vh] text-[1vh] lg:text-[1.25vw] xl:text-[0.85vw]">
                                Color Mode
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setInvertBrightness(false)}
                                    className={`px-3 py-1 text-[0.8vh] lg:text-[1vw] xl:text-[0.7vw] border transition-all duration-200 ${
                                        !invertBrightness
                                            ? 'border-customBlack/80 dark:border-customWhite/80 bg-customBlack/10 dark:bg-customWhite/10'
                                            : 'border-customBlack/30 dark:border-customWhite/30 hover:border-customBlack/50 dark:hover:border-customWhite/50'
                                    }`}
                                >
                                    Normal
                                </button>
                                <button
                                    onClick={() => setInvertBrightness(true)}
                                    className={`px-3 py-1 text-[0.8vh] lg:text-[1vw] xl:text-[0.7vw] border transition-all duration-200 ${
                                        invertBrightness
                                            ? 'border-customBlack/80 dark:border-customWhite/80 bg-customBlack/10 dark:bg-customWhite/10'
                                            : 'border-customBlack/30 dark:border-customWhite/30 hover:border-customBlack/50 dark:hover:border-customWhite/50'
                                    }`}
                                >
                                    Inverted
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Collapsible Settings Panel */}
                </div>
            </div>

            {/* Counter */}
            <div
                className="xl:flex xl:absolute top-0 right-[calc(50%+23.5vw)] xl:h-full xl:w-[calc(50%-23.5vw)]
                    flex-col justify-center items-center xl:pr-3.5 4xl:pr-8 7xl:pr-10
                    font-neueHaasGrotesk font-bold text-[2.5vh] lg:text-[3vw] xl:text-[2vw]">
                <p>/{count.toString().padStart(2, '0')}</p>
                {error && <p className="text-[1vw]">{error}</p>}
            </div>

        </div>
    );
};

export default RandomImageHalftone;