/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cosmos: "#0B0F1C",
        surface: "#1B2333",
        surface2: "#262F47",
        kumkum: "#A6293D",
        kumkumLight: "#C2415A",
        brass: "#D9A73B",
        brassLight: "#F2CA6D",
        parchment: "#EDE6D6",
        dusk: "#4A7089",
      },
      fontFamily: {
        display: ["Marcellus", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
