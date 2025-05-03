import { NavLink, Link, useLocation } from "react-router-dom";
import {motion, useScroll} from "framer-motion";
import PropTypes from "prop-types";
import EncryptionText from "./EncryptionAnim.jsx";
import {useEffect, useState} from "react";

const Header = ({delay = 0.4}) => {

    const [isVisible, setIsVisible] = useState(true);   // tracks the visibility of navbar
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollThreshold = 5; // Minimum scroll change to detect direction

    const { scrollYProgress } = useScroll();

    // check if scrolled to bottom of the screen, then set visible true
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change",(latest) => {
            if (latest >= 0.96) {
                setIsVisible(true);
            }
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [scrollYProgress]);

    // Handle scroll direction, set visible when scrolling down, hide when scrolling up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = Math.max(0, window.scrollY);

            if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
                if (currentScrollY > lastScrollY) {
                    // Scrolling down
                    setIsVisible(false);
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    setIsVisible(true);
                }
                setLastScrollY(currentScrollY);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const location = useLocation();
    const isLandingPage = location.pathname === "/";
    const isArtPage = location.pathname.startsWith("/art/") || location.pathname === "/art";
    const isTechPage = location.pathname === "/tech";
    const isInfoPage = location.pathname === "/info";

    const getLinkClasses = (path) => {
        if (isLandingPage) {
            // On the landing page, all links are full opacity
            return "text-link";
        }

        if (path === "/art" && isArtPage) {
            return "text-link"; // Art should be active when /art or /project/*
        }

        if (path === "/tech" && isTechPage) {
            return "text-link"; // Tech is active on /tech
        }

        if (path === "/info" && isInfoPage) {
            return "text-link"; // Info is active on /info
        }

        // Otherwise, make inactive links greyed out
        return "text-link opacity-50 hover:opacity-100 transition-opacity duration-500";
    };

    return (
      <motion.header
          className="fixed top-0 w-full z-30 mix-blend-difference"
          initial={{y: -100, opacity: 0}}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
          transition={{
              duration: 1.4,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
          }}>
          <motion.nav
              className="flex items-center justify-between text-3xs sm:text-xs md:text-sm 4xl:text-2xl 6xl:text-4xl p-3 md:p-5 xl:px-7 xl:py-4 4xl:px-10 4xl:py-8 7xl:px-14 7xl:py-12
              uppercase font-roboto font-medium tracking-wide text-customWhite [&_a]:after:bg-customBlack dark:[&_a]:after:bg-customWhite"
          >
              <Link to="/" className="text-link">
                  <EncryptionText
                      text={"Joo Eon Park"}
                      delay={0}
                      duration={0.3}
                      speed={20}
                  />
              </Link>
              <ul className="flex gap-4 md:gap-10 3xl:gap-14 4xl:gap-20 6xl:gap-28">
                  <li>
                      <NavLink to="/art" className={() => getLinkClasses("/art")}>
                          Art
                      </NavLink>
                  </li>
                  {/*<span className="font-outfit">/</span>*/}
                  <li>
                      <NavLink to="/tech" className={() => getLinkClasses("/tech")}>
                          Tech
                      </NavLink>
                  </li>
                  {/*<span className="font-outfit">/</span>*/}
                  <li>
                      <NavLink to="/info" className={() => getLinkClasses("/info")}>
                          Info
                      </NavLink>
                  </li>
              </ul>
          </motion.nav>
      </motion.header>
    );
};

// Add PropTypes validation
Header.propTypes = {
    delay: PropTypes.number,
};

export default Header;
