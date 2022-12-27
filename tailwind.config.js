/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    screens: {
      sm: "480px",
      sm2: "640px",
      sm3: "568px",
      md: "768px",
      md2: "870px",
      md3: "960px",
      lg: "1080px",
      lg2: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        primary: "#FFA100",
        secondary: "#C7253A",
      },
      fontFamily: {
        dalek: ["Dalek", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tw-elements/dist/plugin"),
  ],
};
