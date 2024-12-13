import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "motion/react";

const Header = () => {

  const [animationPlayed, setAnimationPlayed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem("navbarAnimationPlayed") === "true";
    }
    return false; // Default value during SSR or if window is undefined
  });

  const handleAnimationComplete = () => {
    setAnimationPlayed(true);
    sessionStorage.setItem("navbarAnimationPlayed", "true");
  };

  return (
    <header className="hero">
      <motion.nav
          className="navbar"
          initial={
            !animationPlayed
                ? {y: -100, opacity: 0}
                : {y: 0, opacity: 1} // Ensure navbar is visible without animation
          }
          animate={{y: 0, opacity: 1}} // Always end at the visible state
          transition={
            !animationPlayed
                ? {
                  duration: 0.8,
                  ease: [0.42, 0, 0.58, 1],
                }
                : {duration: 0} // Instant transition if animation has already played
          }
          onAnimationComplete={!animationPlayed ? handleAnimationComplete : undefined}
      >
        <Link to="/" className="logo text-2xl">
          Joo Eon Park
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink to="/" activeClassName="active" exact>
              Showcase
            </NavLink>
          </li>
          <li>
            <NavLink to="/archive" activeClassName="active">
              Archive
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active">
              About
            </NavLink>
          </li>
        </ul>
      </motion.nav>
    </header>
  );
};

export default Header;
