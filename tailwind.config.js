/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Warm, temple-night palette — no blue channel dominance anywhere,
        // which is what was reading as "violet" before.
        cosmos: "#150D0A",     // deep warm near-black (brown-black, not blue-black)
        surface: "#241914",    // warm dark brown surface
        surface2: "#301F17",   // slightly lighter warm brown
        kumkum: "#B7302A",     // true vermillion/sindoor red, no pink/magenta cast
        kumkumLight: "#D14B3B",
        brass: "#D9A73B",      // marigold gold
        brassLight: "#F2CA6D",
        parchment: "#EDE6D6",  // cream
        dusk: "#C4915C",       // warm muted amber-tan (replaces the old cool teal)
      },
      fontFamily: {
        display: ["Marcellus", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
