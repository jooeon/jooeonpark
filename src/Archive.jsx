import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { motion, useScroll } from "motion/react";

const Archive = () => {
    const [overlayVisible, setOverlayVisible] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCaption, setCurrentCaption] = useState("");

    const portfolioItems = [
        {
            images: ["src/images/Symbiosis.jpg"],
            caption: "Symbiosis<br>Linocut. 2020",
            thumbnail: "src/images/thumbnails/Symbiosis_thumb.jpg",
            alt: "Symbiosis",
        },
        {
            images: ["src/images/The_Workers.jpg"],
            caption: "The Workers<br>Linocut. 2023",
            thumbnail: "src/images/thumbnails/The_Workers_thumb.jpg",
            alt: "The Workers",
        },
        {
            images: [
                "src/images/Man-child_main.jpg",
                "src/images/Man-child_alt1.jpg",
                "src/images/Man-child_alt2.jpg",
            ],
            caption: "Man-child<br>Woodcut. 2023",
            thumbnail: "src/images/thumbnails/Man-child_thumb.jpg",
            alt: "Man-child",
        },
        {
            images: ["src/images/Trapped.jpg"],
            caption: "Trapped<br>Collagraph. 2023",
            thumbnail: "src/images/thumbnails/Trapped_thumb.jpg",
            alt: "Trapped",
        },
        {
            images: [
                "src/images/Ocular Prosthetic for Reading Another Human_01.jpeg",
                "src/images/Ocular Prosthetic for Reading Another Human_02.jpeg",
            ],
            caption:
                "Ocular Prosthetic for Reading Another Human<br>Plastic tubing, wire, glasses. 2024",
            thumbnail:
                "src/images/thumbnails/Ocular Prosthetic for Reading Another Human_thumb.jpeg",
            alt: "Ocular Prosthetic for Reading Another Human",
        },
        {
            images: [
                "src/images/JooEon_Park_OnTheTracks_main.JPEG",
                "src/images/JooEon_Park_OnTheTracks_01.JPEG",
                "src/images/JooEon_Park_OnTheTracks_02.JPEG",
                "src/images/JooEon_Park_OnTheTracks_03.JPEG",
                "src/images/JooEon_Park_OnTheTracks_04.JPEG",
                "src/images/JooEon_Park_OnTheTracks_05.JPEG",
                "src/images/JooEon_Park_OnTheTracks_06.JPEG",
                "src/images/JooEon_Park_OnTheTracks_07.JPEG",
                "src/images/JooEon_Park_OnTheTracks_08.JPEG",
                "src/images/JooEon_Park_OnTheTracks_09.JPEG",
                "src/images/JooEon_Park_OnTheTracks_10.jpg"
            ],
            caption: "On The Tracks<br>Cardboard. 2024",
            thumbnail: "src/images/thumbnails/JooEon_Park_OnTheTracks_thumb.JPEG",
            alt: "On The Tracks",
        },
        {
            images: [
                "src/images/Recollection_main.jpg",
                "src/images/Recollection_01.jpg",
                "src/images/Recollection_02.jpg",
                "src/images/Recollection_03.jpg",
            ],
            caption: "Recollection<br>Ink, collage, plastic film. 2024",
            thumbnail: "src/images/thumbnails/Recollection_thumb.jpg",
            alt: "Recollection",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },
        {
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },{
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },{
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },{
            images: [
                "src/images/Running In a Dream.jpg",
                "src/images/Running In a Dream_Detail_01.jpg",
                "src/images/Running In a Dream_Detail_02.jpg",
                "src/images/Running In a Dream_Detail_03.jpg",
                "src/images/Running In a Dream_Detail_04.jpg",
            ],
            caption: "Running In a Dream<br>Plywood, fabric, nails. 2024",
            thumbnail: "src/images/thumbnails/Running In a Dream_thumb.jpg",
            alt: "Running In a Dream, 2024",
        },

    ];

    const openOverlay = (images, caption) => {
        setCurrentImages(images);
        setCurrentIndex(0);
        setCurrentCaption(caption);
        setOverlayVisible(true);
    };

    const closeOverlay = () => setOverlayVisible(false);

    const prevImage = () => {
        setCurrentIndex((currentIndex - 1 + currentImages.length) % currentImages.length);
    };

    const nextImage = () => {
        setCurrentIndex((currentIndex + 1) % currentImages.length);
    };

    // const { scrollYProgress } = useScroll();

    return (
        <>
            <Header/>
            <main>
                <section id="portfolio">
                    <div className="p-5">
                        <div className="portfolio-grid">
                            {portfolioItems.map((item, index) => (
                                <div
                                    className="portfolio-item"
                                    key={index}
                                    onClick={() => openOverlay(item.images, item.caption)}
                                >
                                    <img src={item.thumbnail} alt={item.alt}/>
                                    <div
                                        className="overlay-text"
                                        dangerouslySetInnerHTML={{__html: item.caption}}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {overlayVisible && (
                <div className="overlay"
                     style={{
                         display: overlayVisible ? "flex" : "none",
                     }}
                     onClick={closeOverlay}>
                    <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={currentImages[currentIndex]}
                            alt="Artwork Preview"
                        />
                        <p
                            className="overlay-caption"
                            dangerouslySetInnerHTML={{__html: currentCaption}}
                        ></p>
                    </div>
                    {currentImages.length > 1 && (
                        <>
                            <button
                                className="prev-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                            >
                                ❮
                            </button>
                            <button
                                className="next-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                            >
                                ❯
                            </button>
                        </>
                    )}
                </div>
            )}

            <Footer/>
        </>
    );
};

export default Archive;
