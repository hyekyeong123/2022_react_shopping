/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#F96162',
      },

      // bg-banner로 사용
      backgroundImage:{
        banner:`url('../public/images/banner.jpg')`,
      }
    },
  },
  plugins: [],
};
