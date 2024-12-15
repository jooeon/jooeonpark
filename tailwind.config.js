/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Add the correct paths here
  theme: {
  	extend: {
		maxWidth: {
			'half': '50%',
			'90vw': '90vw',
		},
		height: {
			'500px':'500px',
		},
		minHeight: {
			'30vh': '30vh',
		},
		maxHeight: {
			'90vh': '90vh',
		},
  		colors: {
			customWhite: "#e0e0e0",
			customBlack: "#1a1a1a"
  		}
  	}
  },
  plugins: [], // Add any plugins here as needed
};
