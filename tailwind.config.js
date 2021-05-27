module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      open: ["Open Sans", "sans-serif"],
    },
    extend: {
      spacing: {
        144: "36rem",
        18: "4.5rem",
      },
      boxShadow: {
        "3xl": "0 12px 75px -15px rgba(0, 0, 0, 0.25)",
      },
      fontSize: {
        "1.5xl": ["1.4rem", "1.9rem"],
      },
      screens: {
        mobile: { max: "639px" },
        laptop: { min: "768px", max: "1535px" },
        tablet: { min: "640px", max: "767px" },
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
    },
  },
  plugins: [],
};