/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./style.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

