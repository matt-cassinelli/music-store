/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", "[data-theme='dark']"],
  theme: {
    extend: {
      colors: { // https://tailwindcss.com/docs/customizing-colors#using-css-variables
        bg1: "var(--color-bg1)",
        bg2: "rgb(var(--color-bg2))",
        fg: "rgb(var(--color-fg))",
        primary: "rgb(var(--color-primary))",
        secondary: "rgb(var(--color-secondary))",
        accent: "rgb(var(--color-accent))",

        red: "var(--color-red)",
        current: "currentColor",
      },
      fontFamily: {
        "sans": ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
};
