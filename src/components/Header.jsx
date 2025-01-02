import { NavLink, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Header = ({delay = 0.4}) => {

    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    const getLinkClasses = ({ isActive }) => {
        if (isLandingPage) {
            // On the landing page, all links are full opacity
            return "text-link text-customBlack dark:text-customWhite";
        }

        // Inactive links are greyed out
        return isActive
            ? "text-link text-customBlack dark:text-customWhite"
            : "text-link text-customBlack dark:text-customWhite opacity-50 hover:opacity-100 transition-opacity duration-500";
    };

    return (
      <motion.header
          className="fixed top-0 w-full z-30"
          initial={{y: -100, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{
              duration: 1.0,
              delay: delay,
              ease: [0.16, 1, 0.3, 1],
          }}>
          <motion.nav
              className="flex items-center justify-between text-xs md:text-base p-5 xl:px-7 xl:py-4
              lowercase font-bold
              [&_a]:after:bg-customBlack dark:[&_a]:after:bg-customWhite"
          >
              <Link to="/" className="text-link text-customBlack dark:text-customWhite">
                  Joo Eon Park
              </Link>
              <ul className="flex gap-2 md:gap-3">
                  <li>
                      <NavLink to="/art" className={getLinkClasses}>
                          Art
                      </NavLink>
                  </li>
                  <span className="font-outfit">/</span>
                  <li>
                      <NavLink to="/tech" className={getLinkClasses}>
                          Tech
                      </NavLink>
                  </li>
                  <span className="font-outfit">/</span>
                  <li>
                      <NavLink to="/about" className={getLinkClasses}>
                          About
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
