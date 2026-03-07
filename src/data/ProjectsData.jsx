export const items = [
    {
        id: "artgrind",
        nextItem: "citibike",
        isVideo: false,
        images: [],
        videos: [
            {
                source: "/videos/artgrind_video_1.mp4",
                hasAudio: false
            },
            {
                source: "/videos/artgrind_video_2.mp4",
                hasAudio: false
            },
            {
                source: "/videos/artgrind_video_3.mp4",
                hasAudio: false
            },
        ],
        caption: [
            "ArtGrind",
            "Web App",
            "Next.js, REST API",
            "2026",
            "Drawing learning tool enabling users to use images gathered on Pinterest as references for timed drawing practice.",
        ],
        thumbnail: "/images/thumbnails/artgrind_thumb.png",
        alt: "ArtGrind Image",
        padding: "pb-10 ",
        link: "/projects/artgrind",
        externalLink: "https://artgrind.art",
        externalLinkLabel: "Visit site",
        hasAnimation: true,
    },
    {
        id: "citibike",
        nextItem: "atopol",
        isVideo: false,
        images: [
            // "/images/citibike_1.png",
            "/images/citibike_3.png",
            "/images/citibike_4.png",
            // "/images/citibike_2.png",
            "/images/citibike_5.png",
        ],
        videos: [
            {
                source: "/videos/citibike_video_1.mp4",
                hasAudio: false
            },
        ],
        caption: [
            "NYC Citi Bike Data Visualization",
            "Data Visualization",
            "React",
            "2025",
            "A creative data visualization project that transforms NYC Citi Bike trip data into an artistic, spatial representation.",
        ],
        thumbnail: "/images/thumbnails/citibike_thumb.jpg",
        alt: "NYC Citi Bike Data Visualization",
        padding: "pb-10 ",
        link: "/projects/citibike",
        externalLink: "https://nyccitibike.netlify.app/",
        externalLinkLabel: "Visit site",
        externalLink_2: "https://citibikenyc.com/system-data",
        externalLinkLabel_2: "NYC Citi Bike System Data",
        hasAnimation: true,
    },
    {
        id: "atopol",
        nextItem: "artgrind",
        isVideo: false,
        images: [
            "/images/atopol_detail_2.JPG",
            "/images/atopol_detail_3.JPG",
        ],
        videos: [
            {
                source: "/videos/atopol_detail_01.mp4",
                hasAudio: false
            },
            {
                source: "/videos/atopol_detail_02.mp4",
                hasAudio: false
            },
        ],
        caption: [
            "Allen Topolski's Portfolio",
            "Art Portfolio",
            "React, CMS",
            "2025",
            "Designed and developed artist Allen Topolski's portfolio",
        ],
        thumbnail: "/images/thumbnails/atopol_thumb.jpg",
        alt: "Allen Topolski's Portfolio",
        padding: "pb-10 ",
        link: "/projects/atopol",
        externalLink: "https://allentopolski.com",
        externalLinkLabel: "Visit site",
        hasAnimation: true,
    },
];

export default items;