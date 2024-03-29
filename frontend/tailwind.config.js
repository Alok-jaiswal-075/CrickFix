/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {        
        'col-bg-primary': '#1A0E1C',
        'col-bg-dark' : '#170d1a',
        'col-text' : '#B9B9B9', 
        'col-link-inactive' : '#7C7C7C',
        'col-btn' : '#F86C4F' 
      },
      fontFamily: {
        'heading': ['"Hanuman"', 'serif'],
        'text': ['"Poppins"', 'sans-serif']
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '&>*');
      addVariant('child-hover', '& > *:hover');
  }
  ],
}
