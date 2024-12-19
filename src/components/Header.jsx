import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {

    // const location = useLocation();
    // const isLandingPage = location.pathname === "/";

    const getLinkClasses = ({ isActive }) => {
        // if (isLandingPage) {
        //     // On the landing page, all links are white
        //     return "text-customBlack dark:text-customWhite";
        // }

        // Active link is white, inactive links are greyed out
        return isActive
            ? "text-customBlack dark:text-customWhite"
            : "text-customBlack dark:text-customWhite opacity-50 hover:opacity-100 transition-opacity duration-500";
    };

    return (
      <header className="h-14">
          <motion.nav
              className="navbar fixed top-0 left-0 w-full z-10 flex items-center
                justify-between uppercase p-6 md:px-7 md:py-4 [&_a]:after:bg-customBlack dark:[&_a]:after:bg-customWhite"
              initial={{y: -100, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              transition={{duration: 0.8, ease: [0.42, 0, 0.58, 1],}}
          >
              <Link to="/" className="relative text-customBlack dark:text-customWhite">
                  J.E.PARK
              </Link>
              <ul className="nav-links flex gap-2 md:gap-7">
                  <li>
                      <NavLink to="/" className={getLinkClasses} exact>
                          Work
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to="/archive" className={getLinkClasses}>
                          Archive
                      </NavLink>
                  </li>
                  <li>
                      <NavLink to="/about" className={getLinkClasses}>
                          About
                      </NavLink>
                  </li>
              </ul>
          </motion.nav>
      </header>
    );
};

export default Header;
