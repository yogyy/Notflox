/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
      },
      screens: {
        xs: '340px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
