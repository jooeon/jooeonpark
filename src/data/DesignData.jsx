export const items = [
    // Change nextItem field on last item to the top most item to make sure the next button wraps to front
    {
        id: "simulacrum",
        nextItem: "post-realm-runway",
        isVideo: false,
        images: [
            "/images/SIMULACRUM-alt.jpg",
            "/images/SIMULACRUM-alt2.jpg",
            "/images/SIMULACRUM-alt3.jpg",
            "/images/SIMULACRUM-FINAL.jpg",
        ],
        videos: [
        ],
        caption: [
            "Simulacrum",
            "Graphic Design, Poster Design",
            "",
            "2026",
            "Poster design for warehouse techno party in Brooklyn, NY",
        ],
        thumbnail: "/images/SIMULACRUM-alt2.jpg",
        alt: "Poster design for warehouse techno party",
        link: "/design/simulacrum",
        externalLink: "",
        externalLinkLabel: "",
    },
    {
        id: "post-realm-runway",
        nextItem: "post-realm-afterparty",
        isVideo: false,
        images: [
            "/images/nyfw_runway_v1.jpg",
            "/images/nyfw_runway_v2.jpg",
        ],
        videos: [
        ],
        caption: [
            "NYFW '26 Runway Show",
            "Graphic Design, Poster Design",
            "",
            "2026",
            "Poster series design for New York Fashion Week '26 Runway Show",
        ],
        thumbnail: "/images/thumbnails/nyfw_runway_thumb.jpg",
        alt: "Poster design for NYFW 2026 Runway Show",
        link: "/design/post-realm-runway",
        externalLink: "",
        externalLinkLabel: "",
    },
    {
        id: "post-realm-afterparty",
        nextItem: "demiurgo-mock",
        isVideo: false,
        images: [
            "/images/nyfw_afterparty_v1.jpg",
            "/images/nyfw_afterparty_v2.jpg",
            "/images/nyfw_afterparty_v3.jpg",
        ],
        videos: [
        ],
        caption: [
            "NYFW '26 Afterparty",
            "Graphic Design, Poster Design",
            "",
            "2026",
            "Poster series design for New York Fashion Week '26 Afterparty",
        ],
        thumbnail: "/images/thumbnails/nyfw_afterparty_thumb.jpg",
        alt: "Poster design for NYFW 2026 Afterparty",
        link: "/design/post-realm-afterparty",
        externalLink: "",
        externalLinkLabel: "",
    },
    {
        id: "demiurgo-mock",
        nextItem: "bowery-electric",
        isVideo: false,
        images: [
            "/images/demiurgo-mock-1.png",
            "/images/demiurgo-mock-2.png",
            "/images/demiurgo-mock-3.png",
        ],
        videos: [
        ],
        caption: [
            "Demiurgo Branding",
            "Branding, Graphic Design",
            "",
            "2025",
            "Branding mockup of Italian fashion brand, Demiurgo Studio",
        ],
        thumbnail: "/images/thumbnails/demiurgo-thumb.png",
        alt: "Branding mockup of Demiurgo Studio",
        link: "/design/demiurgo-mock",
        externalLink: "https://demiurgostudio.com/",
        externalLinkLabel: "Content credit to Demiurgo Studio",
    },
    {
        id: "bowery-electric",
        nextItem: "helios-hours-2",
        isVideo: false,
        images: [
            "/images/swaney.jpeg",
            // "/images/helix_2.jpeg",
            "/images/helix_1.jpeg",
            "/images/lot.jpeg",
        ],
        videos: [
            {
                source: "/videos/helix_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/helix_vid.mp4",
                hasAudio: true
            },
            {
                source: "/videos/lot_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/lot_vid.mov",
                hasAudio: true
            },
            {
                source: "/videos/uche_final.mp4",
                hasAudio: false
            },
            {
                source: "/videos/uche_vid.MOV",
                hasAudio: true
            },
            {
                source: "/videos/swaney_final.mp4",
                hasAudio: false
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
        nextItem: "post-realm-runway",
        isVideo: false,
        images: [
            "/images/helios_final.jpg",
        ],
        videos: [],
        caption: [
            "Helios Hours Vol. II",
            "Graphic Design, Poster Design",
            "",
            "2025",
            "Poster design for independent techno event in Brooklyn, NY",
        ],
        thumbnail: "/images/helios_final.jpg",
        alt: "Helios Hours vol 2 Poster Design",
        link: "/design/helios-hours-2",
        externalLink: "",
        externalLinkLabel: "",
    },
];

export default items;