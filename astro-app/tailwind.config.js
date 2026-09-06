/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cosmos: "#0D1321",
        surface: "#1B2333",
        surface2: "#232C40",
        kumkum: "#8B2635",
        kumkumLight: "#A83B4A",
        brass: "#C89B3C",
        brassLight: "#DDBD6E",
        parchment: "#EDE6D6",
        dusk: "#3A5A6B",
      },
      fontFamily: {
        display: ["Marcellus", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
