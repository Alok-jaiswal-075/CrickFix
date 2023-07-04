/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'bg-primary': '#1A0E1C',
        'bg-dark' : '#140B15',
        'col-text' : '#B9B9B9', 
        'link-inactive' : '#7C7C7C',
        'col-btn' : '#F95333' 
      },
      fontFamily: {
        'font-heading': ['"Hanuman"', 'serif'],
        'font-text': ['"Poppins"', 'sans-serif']
      },
    },
  },
  plugins: [],
}
