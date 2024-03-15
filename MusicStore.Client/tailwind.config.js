/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        accent1: "var(--color-accent1)",
        panel: "var(--color-panel)",
        bg: "var(--color-bg)",
        red: "var(--color-red)",
        grey: "var(--color-grey)",
        transparent: "transparent",
        current: "currentColor",
      }
    }
  },
  plugins: [],
};

// accent2: #6b6cf2,
// accent3: #e77421,
// 1-4 for headings, 5-9 for paragraphs
// clr-grey-1: #102a42;
// clr-grey-2: #243a52;
// clr-grey-3: #324d67;
// clr-grey-4: #48647f;
// clr-grey-5: #617d98;
// clr-grey-6: #829ab0;
// clr-grey-7: #9eb2c7;
// clr-grey-8: #bcccdc;
// clr-grey-9: #dae2ec;
// clr-red-dark: #bb2525;
// clr-red-light: #e66b6b;
// clr-green-dark: #25bb32;
// clr-green-light: #6be675;
