export const items = [
    {
        id: "atopol",
        nextItem: "citibike",
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
            "",
            "2025",
            "Designed and developed artist Allen Topolski's portfolio, with seamless CMS integration for user-centered, autonomous content management",
        ],
        thumbnail: "/images/thumbnails/atopol_thumb.jpg",
        alt: "Allen Topolski's Portfolio",
        padding: "pb-10 ",
        link: "/project/atopol",
        externalLink: "https://allentopolski.com",
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
            "",
            "2025",
            "A creative data visualization project that transforms NYC Citi Bike trip data into an artistic, spatial representation.",
        ],
        thumbnail: "/images/thumbnails/citibike_thumb.jpg",
        alt: "NYC Citi Bike Data Visualization",
        padding: "pb-10 ",
        link: "/project/citibike",
        externalLink: "https://nyccitibike.netlify.app/",
        externalLinkLabel: "Visit site",
        externalLink_2: "https://github.com/jooeon/citibike-visualization",
        externalLinkLabel_2: "More Info",
        hasAnimation: true,
    },
];

export default items;