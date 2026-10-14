/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
        quran: ['Amiri', 'serif'],
      },
      colors: {
        gold: {
          50: '#fdfbf7',
          100: '#fcf7e8',
          400: '#e5c060',
          500: '#D4AF37', // Primary Gold
          600: '#bca02d',
          700: '#967d22',
        },
      },
    },
  },
  plugins: [],
};
