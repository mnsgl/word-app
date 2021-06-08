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
        dark: "0 0 60px 6px rgba(0, 0, 0, 0.5)",
      },
      fontSize: {
        "1.5xl": ["1.4rem", "1.9rem"],
      },
      colors: {
        dark: "#151515",
        darkWhite: "rgba(241, 241, 241, .2)",
      },
    },
  },
  variants: {
    extend: {
      fill: ["hover"],
      listStyleType: ["focus"],
    },
  },
  plugins: [],
};
