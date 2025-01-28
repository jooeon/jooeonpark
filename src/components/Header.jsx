import { NavLink, Link, useLocation } from "react-router-dom";
import {motion} from "framer-motion";
import PropTypes from "prop-types";
import EncryptionText from "./EncryptionAnim.jsx";
import {useEffect, useState} from "react";

const Header = ({delay = 0.4}) => {

    const [isVisible, setIsVisible] = useState(true);   // tracks the visibility of navbar
    const [lastScrollY, setLastScrollY] = useState(0);
    const scrollThreshold = 5; // Minimum scroll change to detect direction

    // Handle scroll direction
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

    const getLinkClasses = ({ isActive }) => {
        if (isLandingPage) {
            // On the landing page, all links are full opacity
            return "text-link";
        }

        // Inactive links are greyed out
        return isActive
            ? "text-link"
            : "text-link opacity-50 hover:opacity-100 transition-opacity duration-500";
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
              className="flex items-center justify-between text-3xs sm:text-xs md:text-sm p-3 md:p-5 xl:px-7 xl:py-4
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
              <ul className="flex gap-4 md:gap-10">
                  <li>
                      <NavLink to="/art" className={getLinkClasses}>
                          Art
                      </NavLink>
                  </li>
                  {/*<span className="font-outfit">/</span>*/}
                  <li>
                      <NavLink to="/tech" className={getLinkClasses}>
                          Tech
                      </NavLink>
                  </li>
                  {/*<span className="font-outfit">/</span>*/}
                  <li>
                      <NavLink to="/info" className={getLinkClasses}>
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
