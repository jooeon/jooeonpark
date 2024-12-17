/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Add the correct paths here
  theme: {
	fontFamily: {
		'raleway': ['Raleway', 'Inter', 'Arial', 'sans-serif'],
		'outfit': ['Outfit', 'Inter', 'Arial', 'sans-serif']
	},
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
			customWhite: "#f1f1f1",
			customBlack: "#1a1a1a"
  		},
		fontSize: {
			'35px': '35px',
		},
  	}
  },
  plugins: [], // Add any plugins here as needed
};
