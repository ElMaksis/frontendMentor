/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans- serif']
    },
    extend: {
      colors: {
        'main': '#9E9AA8',
        'secondary': '#34313D',
        'btn': '#2BD0D0',
        'btn-light': '#9AE3E3'
      }
    },
  },
  plugins: [],
}

