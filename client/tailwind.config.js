/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "primary": "#404040",
      "secondary": "#13ad37",
      "panel": "#ffffff",
      "bg": "#e7e7e8",
      "red": "#bb2525",
      "grey": "#afafaf",
    },
  },
  plugins: [],
};

// [data-theme="dark"] {
//   --accent1: #12852d; /* #9A97F3; */
//   --accent2: #6b6cf2; /* #818cab; #FF3100; */
//   --font: #e5e5fb;
//   --bg: #18191a; /* #282c34; #2c302d; #242424; #212023; */
//   --panel: #242526; /* #171717; #29282b; */
//   --hover: #606060;
// }

// [data-theme="light"] {
//   --accent1: #13ad37;
//   --accent2: #e77421;
//   --font: #404040;
//   --bg: rgb(235, 235, 235);
//   --panel: #fff;
//   --hover: #afafaf; /* #606060; */
// }

// :root {
//    --clr-grey-1: #102a42; /* 1-4 for headings, 5-9 for paragraphs */
//    --clr-grey-2: #243a52;
//    --clr-grey-3: #324d67;
//    --clr-grey-4: #48647f;
//    --clr-grey-5: #617d98;
//    --clr-grey-6: #829ab0;
//    --clr-grey-7: #9eb2c7;
//    --clr-grey-8: #bcccdc;
//    --clr-grey-9: #dae2ec;

//    --clr-red-dark: #bb2525;
//    --clr-red-light: #e66b6b;
//    --clr-green-dark: #25bb32;
//    --clr-green-light: #6be675;

//    --max-width: 95rem;
// }