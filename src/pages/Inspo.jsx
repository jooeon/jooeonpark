import Header from "../components/templates/Header.jsx"
import Footer from "../components/templates/Footer.jsx"
import { useLenis } from "lenis/react"
import {checkWebGL, scrollToTop} from "../Utils.jsx"
import {useEffect} from "react"
import TitleText from "../components/templates/TitleText.jsx"
import CustomTable from "../components/templates/CustomTable.jsx";
import {motion} from "framer-motion";
import TopographicShader from "../components/shaders/Topographic.jsx";
import HalftoneWavesShader from "../components/shaders/HalftoneWaves.jsx";
import HeatmapShader from "../components/shaders/Heatmap.jsx";
import LiquidGrainShader from "../components/shaders/LiquidGrain.jsx";
import LastFmMusicTable from "../components/templates/LastFmMusicTable.jsx";

const Inspo = () => {
    // always begin page from top on load
    const lenis = useLenis()

    useEffect(() => {
        scrollToTop(lenis)
    }, [lenis])

    // Table headings
    // const tableHeadings = ["No.", "Artist", "Title / Year", "Genre (subjective)"]

    // Manual music data, can be used by passing into table like so: <LastFmMusicTable musicData={musicData}/>
    const musicData = [
        {
            no: "/01",
            artist: "Ecca Vandal",
            titleyear: "CRUISING TO SELF SOOTHE (2025)",
            genresubjective: "Punk rock",
            albumArt: "/images/thumbnails/album_covers/ecca-vandal_cruising.jpg",
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
            artist: "Smashing Pumpkins",
            titleyear: "Siamese Dream (1993)",
            genresubjective: "Rock, alt rock",
            albumArt: "/images/thumbnails/album_covers/smashing-pumpkins_siamese-dream.jpg",
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
            artist: "Gary Clark Jr.",
            titleyear: "Catfish Blues (Live) (2014)",
            genresubjective: "Rock, blues rock",
            albumArt: "/images/thumbnails/album_covers/gary-clark-jr_live.jpg",
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
                <TitleText phrase={"Inspiration"} className={"pl-3 md:pl-3.5 xl:pl-3.5 4xl:pl-8 7xl:pl-10"}/>
                <section>
                    <motion.div
                        className="flex justify-between"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            delay: 1.2,
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex justify-center items-end w-1/4 md:w-4/12 xl:w-1/2 pt-10 xl:pt-0 ml-2 xl:ml-0
                            font-neueHaasGrotesk font-semibold lowercase text-[1.5vh] md:text-[2vh] xl:text-[1vw] text-left">
                            <p className="leading-none w-10/12 xl:w-10/12">* Updated automatically every 24 hours</p>
                        </div>
                        <div className="flex flex-col items-end w-3/4 md:w-9/12 xl:w-1/2 pt-10 xl:pt-0 mr-2 xl:mr-0
                            font-neueHaasGrotesk font-semibold lowercase text-[2.5vh] md:text-[4vh] xl:text-[2.5vw] text-left">
                            <p className="leading-none w-11/12 xl:w-9/12">Top 10 artists & albums</p>
                            <p className="leading-none w-10/12 xl:w-7/12">In my queue this month.</p>
                        </div>
                    </motion.div>
                    <div
                        className="w-full mt-10 lg:mt-14 2xl:mt-[4vw] mb-10 xl:mb-8 3xl:mb-20 font-neueHaasGrotesk font-bold
                        flex flex-col justify-start items-center
                        text-[3vh] xl:text-[2vw]"
                    >
                        {/*<LastFmMusicTable musicData={musicData}/>*/}
                        <LastFmMusicTable />
                    </div>
                </section>
                {checkWebGL() &&
                    <section className="mt-[8vh] mb-[2vh] xl:mb-[4vh] p-3 md:p-3.5 xl:p-3.5 4xl:p-8 7xl:p-10">
                    <motion.div
                        className="mb-[8vh]"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{
                            delay: 1.2,
                            duration: 0.3,
                            ease: "easeOut",
                        }}
                    >
                        <div className="flex items-baseline gap-[3vw] xl:gap-[1vw] font-neueHaasGrotesk font-semibold lowercase">
                            <p className="leading-none text-[6vh] xl:text-[4.5vw]">Visual Experiments</p>
                            <p className="leading-none text-[2vh] xl:text-[1vw]">/WebGL</p>
                        </div>
                    </motion.div>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-3.5 xl:gap-[2vw]">
                        <div className="hover-shader aspect-square overflow-hidden w-full xl:w-[47vw]">
                            <div className="inset-0 w-full xl:w-[50vw] h-full xl:h-[50vw]">
                                <HalftoneWavesShader/>
                            </div>
                        </div>
                        <div className="hover-shader aspect-square overflow-hidden w-full xl:w-[47vw]">
                            <div className="inset-0 w-[200vw] xl:w-[50vw] h-[200vw] xl:h-[50vw]">
                                <TopographicShader/>
                            </div>
                        </div>
                        <div className="hover-shader aspect-square overflow-hidden w-full xl:w-[47vw]">
                            <div className="inset-0 w-full xl:w-[50vw] h-full xl:h-[50vw]">
                                <HeatmapShader/>
                            </div>
                        </div>
                        <div className="hover-shader aspect-square overflow-hidden w-full xl:w-[47vw]">
                            <div className="inset-0 w-full xl:w-[50vw] h-full xl:h-[50vw]">
                                <LiquidGrainShader/>
                            </div>
                        </div>
                        {/*<div className="hover-shader aspect-square overflow-hidden w-full xl:w-[47vw]">*/}
                        {/*    <div className="inset-0 w-full h-full">*/}
                        {/*        <HalftoneOverlayShader imageUrl="images/thumbnails/album_covers/fka-twigs_eusexua.jpg"/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<RandomImageHalftone />*/}
                    </div>
                </section>
                }
            </main>
            <Footer/>
        </>
    )
}

export default Inspo
