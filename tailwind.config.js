/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
	fontFamily: {
		'poppins': ['Poppins', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'raleway': ['Raleway', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'outfit': ['Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'aldrich': ['Aldrich', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'roboto': ['Roboto Mono', 'system-ui', 'monospace'],
		'azeret': ['Azeret Mono', 'Roboto Mono', 'system-ui', 'monospace'],
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
			'10xl': '10rem', /* 160px */
			'11xl': '12rem', /* 192px */
			'12xl': '13.5rem', /* 216px */
			'13xl': '15rem', /* 240px */
			'14xl': '17rem', /* 272px */
			'15xl': '19rem', /* 304px */
			'16xl': '21rem', /* 336px */
			'17xl': '23rem', /* 368px */
			'18xl': '25rem', /* 400px */
		},
		backdropBlur: {
			xs: '0.75px',
		},
  		colors: {
			customWhite: "#fafafa",
			customBlack: "#070707",
			customBlackLight: "#1c1c1c",
			customGray: "#9a9a9a",
			customGrayLight: "#cfcfcf",
			customNavy: "#100f14",
			customNavyLight: "#15141a",
  		},
		screens: {
			'3xl': '2560px',
			'4xl': '3024px',
			'5xl': '3456px',
		},
  	}
  },
  plugins: [], // Add any plugins here as needed
};
