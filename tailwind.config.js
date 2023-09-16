/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss").colors;

export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
