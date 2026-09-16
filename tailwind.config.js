/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Yellowish rishi-muni palette — turmeric/haldi gold as the lead
        // color, red as a secondary accent only (not co-equal with saffron).
        cosmos: "#120A06",
        surface: "#2B1810",
        surface2: "#3A2013",
        saffron: "#F0A91E",       // turmeric/haldi yellow-gold — the lead color now
        saffronLight: "#FFCB5C",
        kumkum: "#C41E2E",        // kept only as a small secondary accent
        kumkumLight: "#E23B4A",
        brass: "#E8B93A",         // shifted more yellow, less orange
        brassLight: "#FBDB80",
        parchment: "#FCEFDD",
        dusk: "#C4915C",
      },
      fontFamily: {
        display: ["Marcellus", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
