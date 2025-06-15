/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bg: 'var(--color-bg)',
        text: 'var(--color-text)',
        history: 'var(--color-history)',
      },
       fontFamily: {
        serifAncizar: ['"Ancizar Serif"', 'serif'],
        handlee: ['Handlee', 'cursive'],
      },
    }, 
  },
  plugins: [require('tailwind-scrollbar-hide'),require('@tailwindcss/typography')],
}