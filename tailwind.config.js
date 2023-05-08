/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
