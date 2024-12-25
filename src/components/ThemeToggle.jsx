import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const ThemeToggle = () => {
    // State to track if dark mode is enabled
    const [isDark, setIsDark] = useState(false);

    // On component mount, check for saved theme or system preference
    useEffect(() => {
        // Check localStorage for theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                setIsDark(true);
            } else {
                document.documentElement.classList.remove('dark');
                setIsDark(false);
            }
        } else {
            // If no preference saved, check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
                setIsDark(true);
            }
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
        <div
            onClick={toggleTheme}
            data-isdark={isDark}
            className="switch bg-customBlack dark:bg-customWhite m-1.5"
            aria-label="Toggle Dark Mode"
        >
            <motion.div
                className="handle bg-customWhite dark:bg-customBlack"
                layout
                transition={{duration: 0.1,
                    ease: "linear"}}
            ></motion.div>
        </div>
    );
};

export default ThemeToggle;
