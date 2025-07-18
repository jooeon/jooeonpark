import { useEffect, useState } from 'react';
import { Moon, Sun } from "lucide-react";

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
        <div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <Sun
                className={`h-[1.5vh] w-[1.5vh] xl:h-[1vw] xl:w-[1vw] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isDark ? "text-[#A1A1AA] opacity-50 scale-75" : "text-foreground opacity-100 scale-100"
                }`}
            />
            <button
                onClick={toggleTheme}
                type="button"
                role="switch"
                aria-checked={isDark}
                className="peer inline-flex h-[1vh] w-[2.5vh] xl:h-[0.75vw] xl:w-[1.5vw] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent
                focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
                disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input
                transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 bg-[#d6d6d6] dark:bg-[#474747]"
                aria-label="Toggle theme"
            >
                <span
                    className={`pointer-events-none block h-[0.75vh] w-[0.75vh] xl:h-[0.6vw] xl:w-[0.6vw] rounded-full shadow-lg ring-0 
                    transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-customWhite dark:bg-customBlack ${
                        isDark ? 'translate-x-[1.5vh] xl:translate-x-[0.75vw]' : 'translate-x-0'
                    }`}
                />
            </button>
            <Moon
                className={`h-[1.5vh] w-[1.5vh] xl:h-[1vw] xl:w-[1vw] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    !isDark ? "text-[#A1A1AA] opacity-50 scale-75" : "text-foreground opacity-100 scale-100"
                }`}
            />
        </div>
    );
};

export default ThemeToggle;