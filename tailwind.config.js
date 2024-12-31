/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Add the correct paths here
  theme: {
	fontFamily: {
		'raleway': ['Raleway', 'Outfit', 'Arial', 'sans-serif'],
		'outfit': ['Outfit', 'Arial', 'sans-serif'],
		'aldrich': ['Aldrich', 'Outfit', 'Arial', 'sans-serif'],
		'roboto': ['Roboto Mono', 'monospace'],
		'azeret': ['Azeret Mono', 'Roboto Mono', 'monospace'],
	},
  	extend: {
		width: {
			'50vw': '50vw',
			'90vw': '90vw',
		},
		maxWidth: {
			'half': '50%',
			'90vw': '90vw',
		},
		height: {
			'500px':'500px',
			'90vh': '90vh',
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
		fontSize: {
			'35px': '35px',
		},
		backdropBlur: {
			xs: '0.75px',
		},
  		colors: {
			customWhite: "#f1f1f1",
			customBlack: "#070707",
			customBlackLight: "#171717",
			customGray: "#979797",
			customGrayLight: "#cfcfcf",
			customNavy: "#100f14",
			customNavyLight: "#15141a",
  		},
  	}
  },
  plugins: [], // Add any plugins here as needed
};
