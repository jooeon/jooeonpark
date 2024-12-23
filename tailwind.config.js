/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Add the correct paths here
  theme: {
	fontFamily: {
		'raleway': ['Raleway', 'Outfit', 'Arial', 'sans-serif'],
		'outfit': ['Outfit', 'Inter', 'Arial', 'sans-serif'],
		'inter': ['Inter', 'Outfit', 'Arial', 'sans-serif'],
		'roboto': ['Roboto Mono', 'Outfit', 'Arial', 'sans-serif'],
	},
  	extend: {
		width: {
			'50vw': '50vw',
		},
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
		spacing: {
			'40rem' : '40rem',
			'50rem' : '50rem',
			'60rem' : '60rem',
		},
  		colors: {
			customWhite: "#f1f1f1",
			customBlack: "#100f14",
			customGray: "#a1a1a1",
			customNavyLight: "#15141a",
  		},
		fontSize: {
			'35px': '35px',
		},
  	}
  },
  plugins: [], // Add any plugins here as needed
};
