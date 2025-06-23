import Header from "../components/templates/Header.jsx"
import Footer from "../components/templates/Footer.jsx"
import { useLenis } from "lenis/react"
import { scrollToTop } from "../Utils.jsx"
import { useEffect } from "react"
import TitleText from "../components/templates/TitleText.jsx"
import CustomTable from "../components/templates/CustomTable.jsx";
import {motion} from "framer-motion";

const Inspo = () => {
    // always begin page from top on load
    const lenis = useLenis()

    useEffect(() => {
        scrollToTop(lenis)
    }, [lenis])

    // Table headings
    const tableHeadings = ["No.", "Artist", "Title / Year", "Genre (subjective)"]

    const musicData = [
        {
            no: "/01",
            artist: "Fred again..",
            titleyear: "USB (2022)",
            genresubjective: "Electronic",
            albumArt: "/images/thumbnails/album_covers/fred-again_usb.jpg",
        },
        {
            no: "/02",
            artist: "Little Simz",
            titleyear: "Gorilla (2022)",
            genresubjective: "Hip-hop",
            albumArt: "/images/thumbnails/album_covers/little-simz_no-thank-you.jpg",
        },
        {
            no: "/02",
            artist: "Peggy Gou",
            titleyear: "I Hear You (2024)",
            genresubjective: "Electronic, house, dance",
            albumArt: "/images/thumbnails/album_covers/peggy-gou_i-hear-you.jpg",
        },
        {
            no: "/03",
            artist: "Autechre",
            titleyear: "Tri Repetae (1995)",
            genresubjective: "Electronic, IDM",
            albumArt: "/images/thumbnails/album_covers/autechre_tri-repetae.jpg",
        },
        {
            no: "/04",
            artist: "FKA Twigs",
            titleyear: "EUSEXUA (2025)",
            genresubjective: "Electronic, dance",
            albumArt: "/images/thumbnails/album_covers/fka-twigs_eusexua.jpg",
        },
        {
            no: "/05",
            artist: "Alice In Chains",
            titleyear: "Dirt (1992)",
            genresubjective: "Grunge, alt metal",
            albumArt: "/images/thumbnails/album_covers/alice-in-chains_dirt.jpg",
        },
        {
            no: "/06",
            artist: "Nirvana",
            titleyear: "Dive (1992)",
            genresubjective: "Grunge, alt rock",
            albumArt: "/images/thumbnails/album_covers/nirvana_incesticide.jpg",
        },
        {
            no: "/07",
            artist: "WACK",
            titleyear: "2004 (2023)",
            genresubjective: "Alt rock, korean indie rock",
            albumArt: "/images/thumbnails/album_covers/wack_2004.jpg",
        },
        {
            no: "/08",
            artist: "HYUKOH",
            titleyear: "Gondry (2015)",
            genresubjective: "Alt rock, korean indie rock",
            albumArt: "/images/thumbnails/album_covers/hyukoh_22.jpg",
        },
        {
            no: "/09",
            artist: "The Smile",
            titleyear: "A Light for Attracting Attention (2022)",
            genresubjective: "Alternative",
            albumArt: "/images/thumbnails/album_covers/the-smile_a-light-for-attracting.jpg",
        },
        {
            no: "/10",
            artist: "Nine Inch Nails",
            titleyear: "Head Like a Hole (1989)",
            genresubjective: "Industrial, alternative",
            albumArt: "/images/thumbnails/album_covers/nin_pretty-hate-machine.jpg",
        },
    ]

    return (
        <>
            <Header />
            <main>
                <section>
                    <TitleText phrase={"inspo"} className={"pl-3 md:pl-3.5 xl:pl-3.5 4xl:pl-8 7xl:pl-10"}/>
                    <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 1.2,
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex flex-col items-end w-5/6 md:w-1/2 pt-10 xl:pt-0
                            font-neueHaasGrotesk font-semibold lowercase text-[3vh] xl:text-[2.5vw] text-left">
                            <p className="leading-none w-11/12 xl:w-9/12">Songs & albums</p>
                            <p className="leading-none w-10/12 xl:w-7/12">recently in my queue.</p>
                        </div>
                    </motion.div>
                    <div
                        className="w-full mt-10 lg:mt-14 2xl:mt-16 3xl:mt-20 4xl:mt-32 7xl:mt-40 mb-10 xl:mb-8 3xl:mb-20 font-neueHaasGrotesk font-bold
                        flex flex-col justify-start items-center
                        text-[3vh] xl:text-[2vw]"
                    >
                        <CustomTable data={musicData} headings={tableHeadings} imageField="albumArt" enableCursorHover={true} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Inspo
