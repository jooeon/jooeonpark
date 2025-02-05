/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'selector',
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
	fontFamily: {
		// 'almarai': ['Almarai', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'founders': ['Founders Grotesk', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'nick': ['Nickelodeon2001', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'poppins': ['Poppins', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'raleway': ['Raleway', 'Outfit', 'Arial', 'system-ui', 'sans-serif'],
		// 'outfit': ['Outfit', 'Arial', 'system-ui', 'sans-serif'],
		'roboto': ['Roboto Mono', 'system-ui', 'monospace'],
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
			'5xs': ['0.25rem', '0.667rem'],
			'4xs': ['0.375rem', '0.667rem'],
			'3xs': ['0.5rem', '0.75rem'],
			'2xs': ['0.625rem', '0.75rem'],
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
			customBlackLight: "#151515",
			customGray: "#9a9a9a",
			customGrayLight: "#ececec",
			customNavy: "#100f14",
			customNavyLight: "#15141a",
  		},
		screens: {
			'xs': '390px',
			'3xl': '2560px',
			'4xl': '3024px',
			'5xl': '3456px',
			'6xl': '3840px',	// 4k
			'7xl': '5120px',	// Studio Display
		},
  	}
  },
  plugins: [], // Add any plugins here as needed
};
