import { useEffect, useState } from 'react';

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
            type="button"
            className="h-[1.5vh] w-[1.5vh] xl:h-[1vw] xl:w-[1vw] rounded-full bg-customBlack dark:bg-customWhite
            transition-transform duration-200 ease-out hover:scale-150 cursor-pointer opacity-95"
            aria-label="Toggle theme"
        />
    );
};

export default ThemeToggle;