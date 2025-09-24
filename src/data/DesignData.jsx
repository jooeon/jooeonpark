export const items = [
    {
        id: "bowery-electric",
        nextItem: "helios-hours-2",
        isVideo: false,
        images: [
            "/images/helix_2.jpeg",
            "/images/helix_1.jpeg",
            "/images/swaney.jpeg",
            "/images/lot.jpeg",
        ],
        videos: [
            {
                source: "/videos/helix_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/lot_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/uche_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/swaney_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/lot_vid.mov",
                hasAudio: true
            },
            {
                source: "/videos/helix_vid.mov",
                hasAudio: true
            },
            {
                source: "/videos/lot_vid_2.mov",
                hasAudio: true
            },
        ],
        caption: [
            "Techno @ Bowery Electric",
            "Motion Design",
            "",
            "2025",
            "Visual projections for techno event hosted at Bowery Electric NYC",
        ],
        thumbnail: "/images/thumbnails/helix.gif",
        alt: "Bowery Electric Techno Event Motion Design",
        link: "/design/bowery-electric",
        externalLink: "https://www.instagram.com/serif.dsgn/",
        externalLinkLabel: "Photos by Serif Design Studio",
    },
    {
        id: "helios-hours-2",
        nextItem: "bowery-electric",
        isVideo: false,
        images: [
            "/images/helios_final.jpg",
        ],
        videos: [],
        caption: [
            "Helios Hours Vol. II",
            "Poster Design",
            "",
            "2025",
            "Designed for independent techno event in Brooklyn, NY",
        ],
        thumbnail: "/images/helios_final.jpg",
        alt: "Helios Hours vol 2 Poster Design",
        link: "/design/helios-hours-2",
        externalLink: "",
        externalLinkLabel: "",
    },
];

export default items;