/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Bhagwa/saffron-red-gold — the actual traditional Hindu religious
        // palette (temple flags, tilak, marigold, sindoor), committed to
        // fully rather than hinted at with dark muted tones.
        cosmos: "#170D08",       // warm near-black base, still dark enough for text contrast
        surface: "#2B1810",      // warm dark brown surface
        surface2: "#3A2013",     // lighter warm brown
        saffron: "#F2811D",      // bhagwa — the primary religious accent
        saffronLight: "#FFA94D",
        kumkum: "#C41E2E",       // vivid sindoor red, no muddy/pink cast
        kumkumLight: "#E23B4A",
        brass: "#E3A730",        // marigold gold
        brassLight: "#F7C85C",
        parchment: "#FCEFDD",    // warm cream (slightly warmer than before)
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
