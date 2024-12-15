/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"], // Add the correct paths here
  theme: {
  	extend: {
		minHeight: {
			'30vh': '30vh',
		},
		maxWidth: {
			'half': '50%',
			'90vw': '90vw',
		},
		maxHeight: {
			'90vh': '90vh',
		},
  		colors: {
			customWhite: "#f0f0f0"
  		}
  	}
  },
  plugins: [], // Add any plugins here as needed
};
