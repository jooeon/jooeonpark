import { NavLink, Link, useLocation } from "react-router-dom"
import {motion, useMotionValueEvent, useScroll} from "motion/react"
import PropTypes from "prop-types"
import EncryptionText from "../EncryptionAnim.jsx"
import {useRef, useState} from "react"

const Header = ({ delay = 0.4 }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const location = useLocation()
    const isLandingPage = location.pathname === "/"
    const isWorkPage = location.pathname.startsWith("/work/") || location.pathname === "/work"
    const isArtPage = location.pathname.startsWith("/art/") || location.pathname === "/art"
    const isDesignPage = location.pathname.startsWith("/design/") || location.pathname === "/design"
    const isInspoPage = location.pathname === "/inspo"
    const isTechPage = location.pathname === "/tech"
    const isInfoPage = location.pathname === "/info"

    const [isVisible, setIsVisible] = useState(true) // tracks the visibility of navbar
    const scrollThreshold = 5 // Minimum scroll change to detect direction
    const scrollMobileThreshold = 8 // Minimum scroll change to detect direction

    const { scrollY, scrollYProgress } = useScroll();
    const lastY = useRef(0)

    // Handle scroll direction, set visible when scrolling down, hide when scrolling up
    useMotionValueEvent(scrollY, "change", latest => {

        // Close mobile menu when scrolling (at least 8px in one scroll)
        if (isMobileMenuOpen && Math.abs(latest - lastY.current) > scrollMobileThreshold) {
            setIsMobileMenuOpen(false)
        }

        // Below only for landing page
        if (isLandingPage && Math.abs(latest - lastY.current) > scrollThreshold) {
            // Positive velocity = scrolling down
            setIsVisible(latest < lastY.current) // show when scrolling up, hide when scrolling down
            lastY.current = latest;
        }
    });

    useMotionValueEvent(scrollYProgress, "change", latest => {
        // check if scrolled to bottom of the screen, then set visible true
        if (latest >= 0.96 || latest <= 0.04) setIsVisible(true)
    });

    const getLinkClasses = (path) => {
        if (isLandingPage) {
            // On the landing page, all links are full opacity
            return "text-link"
        }

        if (path === "/work" && isWorkPage) {
            return "text-link" // work should be active when /work/*
        }

        if (path === "/art" && isArtPage) {
            return "text-link" // Art should be active when /art/*
        }

        if (path === "/design" && isDesignPage) {
            return "text-link" // Design should be active when /design/*
        }

        if (path === "/inspo" && isInspoPage) {
            return "text-link" // Inspo is active on /inspo
        }

        if ((path === "/info" || path === "/tech") && (isInfoPage || isTechPage)) {
            return "text-link" // Info is active on /info or /tech
        }

        // Otherwise, make inactive links greyed out
        return "text-link opacity-50 hover:opacity-100 transition-opacity duration-500"
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <motion.header
                className="pointer-events-none fixed top-0 w-full z-30 mix-blend-difference"
                initial={{ y: -100, opacity: 0 }}
                animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{
                    duration: 1.4,
                    delay: delay,
                    ease: [0.16, 1, 0.3, 1],
                }}
            >
                <nav className="flex items-center justify-between [&_a]:pointer-events-auto
                        text-fluid-sm uppercase font-roboto font-medium tracking-wide
                        px-3 py-5 md:px-4 md:py-7 xl:px-4 xl:py-6 3xl:px-5 3xl:py-8 4xl:px-6 4xl:py-10 7xl:px-10 7xl:py-16
                        text-customWhite [&_a]:after:bg-customBlack dark:[&_a]:after:bg-customWhite">
                    <Link to="/" className="text-link font-neueHaasGrotesk font-bold lg:font-roboto lg:font-medium" onClick={closeMobileMenu}>
                        <EncryptionText text={"Joo Eon Park"} delay={0} duration={0.3} speed={20} />
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex gap-4 md:gap-10 3xl:gap-14 4xl:gap-20 6xl:gap-28">
                        <li>
                            <NavLink to="/work" className={() => getLinkClasses("/work")}>
                                Work
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/art" className={() => getLinkClasses("/art")}>
                                Art
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/design" className={() => getLinkClasses("/design")}>
                                Design
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/inspo" className={() => getLinkClasses("/inspo")}>
                                Inspo
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/info" className={() => getLinkClasses("/info")}>
                                Info
                            </NavLink>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden text-link uppercase font-neueHaasGrotesk font-bold tracking-wide pointer-events-auto"
                    >
                        Menu
                    </button>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <motion.div
                className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMobileMenu} />

                {/* Menu content */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-customWhite dark:bg-customBlack px-5 py-5 md:px-5 md:py-7"
                    initial={{ y: -100 }}
                    animate={{ y: isMobileMenuOpen ? 0 : -100 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                    <nav className="flex flex-col text-left gap-0.5 md:gap-1">
                        {[
                            { to: "/", text: "Joo Eon Park", delay: 0.2 },
                            { to: "/work", text: "Work", delay: 0.25 },
                            { to: "/art", text: "Art", delay: 0.3 },
                            { to: "/design", text: "Design", delay: 0.35 },
                            { to: "/inspo", text: "Inspo", delay: 0.4 },
                            { to: "/info", text: "Info", delay: 0.45 },
                        ].map((link, index) => {
                            const Component = index === 0 ? Link : NavLink
                            return (
                                <motion.div
                                    key={link.to}
                                    className="w-fit"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isMobileMenuOpen ? 1 : 0,
                                        y: isMobileMenuOpen ? 0 : 20,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        delay: isMobileMenuOpen ? link.delay : 0,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Component
                                        to={link.to}
                                        className={`text-customBlack dark:text-customWhite uppercase font-neueHaasGrotesk font-bold tracking-wide text-xl md:text-2xl block`}
                                        onClick={closeMobileMenu}
                                    >
                                        {link.text}
                                    </Component>
                                </motion.div>
                            )
                        })}
                    </nav>
                </motion.div>
            </motion.div>
        </>
    )
}

// Add PropTypes validation
Header.propTypes = {
    delay: PropTypes.number,
}

export default Header
