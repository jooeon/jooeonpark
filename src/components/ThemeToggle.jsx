import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

// Theme toggle functionality and button
const ThemeToggle = () => {
    // State to track if dark mode is enabled
    const [isDark, setIsDark] = useState(false);

    // On component mount, set dark theme as default
    useEffect(() => {
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'light') {
            // If saved preference is light, apply light theme
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        } else {
            // Default to dark theme
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    // Function to toggle theme
    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            data-isdark={isDark}
            className="switch bg-customBlack dark:bg-customWhite m-1.5 cursor-none"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                className="handle bg-customWhite dark:bg-customBlack"
                layout
                transition={{duration: 0.1,
                    ease: "linear"}}
            ></motion.div>
        </button>
    );
};

export default ThemeToggle;
