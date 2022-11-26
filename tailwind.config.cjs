/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

/**
 * [docs](https://www.tailwindcss.cn/)
 */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // extend: {
    //   colors: {
    //     primary: "var(--color-primary)",
    //   },
    // },
    colors: {
      primary: "var(--color-primary)",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.rose,
      orange: colors.orange,
      green: colors.emerald,
      blue: colors.indigo,
      purple: colors.purple,
      pink: colors.pink,
    },
  },
  plugins: [],
};
