/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',  // Quét các file HTML trong thư mục gốc
    './src/**/*.{html,js}',  // Quét các file HTML và JS trong thư mục src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
