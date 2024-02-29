/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      blackHans: ['"Black Han Sans"', "sans-serif"],
      robotoLight: ['"Roboto"', "sans-serif"],
      roboto: ['"Roboto"', "sans-serif"],
      robotoMedium: ['"Roboto"', "sans-serif"],
      robotoBold: ['"Roboto"', "sans-serif"],
      robotoBlack: ['"Roboto"', "sans-serif"],

      latoLight: ['"Lato"', "sans-serif"],
      lato: ['"Lato"', "sans-serif"],
      latoBold: ['"Lato"', "sans-serif"],
      latoBlack: ['"Lato"', "sans-serif"],
    },
    fontWeight: {
      robotoLight: ["300"],
      roboto: ["400"],
      robotoMedium: ["500"],
      robotoBold: ["700"],
      robotoBlack: ["900"],

      latoLight: ["300"],
      lato: ["400"],
      latoBold: ["700"],
      latoBlack: ["900"],
    },
  },
  plugins: [],
};
