/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./**/*.html'],
  theme: {
    screens: {
      'sm': '440px',
      'md': '740px',
      'lg': '1024px',
      'xl': '1182px',
      '2xl': '1536px',
    },
    fontFamily: {
      'nunito': ['Nunito Sans', 'sans- serif']
    },
    extend: {
      boxShadow: {
        'light': '0px 2px 9px 0px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}

