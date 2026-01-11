import { motion } from "framer-motion"
import { useCursor } from "../cursor/CursorContext.jsx"
import PropTypes from "prop-types"
import {formatString} from "../../Utils.jsx";
import {useEffect, useState} from "react";

// Data keys should match the lowercase version of headings (with dots removed)
// Example: "No." becomes "no", "Artist" becomes "artist"
// The image field can be named anything (like "albumart", "image", "photo", etc.)
const CustomTable = ({
                         data,
                         headings,
                         imageField = null, // Field name that contains image for cursor hover
                         enableCursorHover = false,
                         viewMode = 'albums', // 'albums' or 'songs'
                     }) => {
    const { handleAlbumHover, handleAlbumLeave } = useCursor()
    const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)

    const handleRowHover = (item) => {
        if (enableCursorHover && imageField && item[imageField]) {
            handleAlbumHover(item[imageField])
        }
    }

    const handleRowLeave = () => {
        if (enableCursorHover) {
            handleAlbumLeave()
        }
    }

    // Mark as initially loaded after the container animation completes
    useEffect(() => {
        const timer = setTimeout(() => {
            setHasInitiallyLoaded(true)
        }, 1500) // Container delay (1.1s) + some buffer

        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="w-full">
            {/* Desktop Table - Hidden on mobile/tablet */}
            <table className="w-full hidden xl:table table-fixed">
                <thead>
                    <motion.tr
                        className="text-left lowercase text-[0.75vh] xl:text-[1vw]
                            [&_th]:px-3.5 [&_th]:3xl:px-5 [&_th]:4xl:px-7 [&_th]:7xl:px-10
                            [&_th]:pb-[3.5vh]
                            [&_th:nth-child(1)]:w-[6%]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 1.2,
                            ease: "easeOut",
                        }}
                    >
                        {headings.map((heading, index) => (
                            <th key={index}>{heading}</th>
                        ))}
                    </motion.tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <motion.tr
                        key={`${viewMode}-${index}`}  // Add viewMode to key to force remount
                        className="hover:bg-customBlack hover:text-customWhite dark:hover:bg-customWhite dark:hover:text-customBlack
                                transition-colors duration-200
                                [&_td]:pointer-events-auto [&_td]:leading-none [&_td]:truncate
                                [&_td]:py-1 [&_td]:xl:py-3 [&_td]:3xl:py-4 [&_td]:4xl:py-5 [&_td]:7xl:py-8
                                [&_td]:px-3.5 [&_td]:3xl:px-5 [&_td]:4xl:px-7 [&_td]:7xl:px-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: hasInitiallyLoaded ? 0 + index * 0.1 : 1.3 + index * 0.1,
                            ease: "easeOut",
                        }}
                        onMouseEnter={() => handleRowHover(item)}
                        onMouseLeave={handleRowLeave}
                    >
                        {headings.map((heading, cellIndex) => (
                            <td key={cellIndex}>{item[formatString(heading)]}</td>
                        ))}
                    </motion.tr>
                ))}
                </tbody>
            </table>

            {/* Mobile/Tablet Layout - Shown only on screens smaller than lg (1024px) */}
            <div className="block xl:hidden">
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        className="hover:bg-customBlack hover:text-customWhite dark:hover:bg-customWhite dark:hover:text-customBlack
                            transition-colors duration-200
                            px-3.5 py-3 md:py-4 xl:mb-2 pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.4,
                            delay: hasInitiallyLoaded ? 0 : 1.3 + index * 0.1,
                            ease: "easeOut",
                        }}
                        onMouseEnter={() => handleRowHover(item)}
                        onMouseLeave={handleRowLeave}
                    >
                        <div className="leading-tight space-y-1">
                            {headings.map((heading, cellIndex) => (
                                <div key={cellIndex} className="first:text-right">{item[formatString(heading)]}</div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

CustomTable.propTypes = {
    data: PropTypes.array.isRequired,
    headings: PropTypes.array.isRequired,
    imageField: PropTypes.string,
    enableCursorHover: PropTypes.bool,
    viewMode: PropTypes.string,
}

export default CustomTable
