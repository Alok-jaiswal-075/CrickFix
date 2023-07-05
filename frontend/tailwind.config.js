/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        'col-bg-primary': '#1A0E1C',
        'col-bg-dark' : '#140B15',
        'col-text' : '#B9B9B9', 
        'col-link-inactive' : '#7C7C7C',
        'col-btn' : '#F95333' 
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
