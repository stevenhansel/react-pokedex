module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      letterSpacing: {
        xl: "0.3em",
        "2xl": "0.6em",
        "3xl": "0.9em",
        "4xl": "1.2em",
      },
      inset: {
        "1/8": "12.5%",
        "1/5": "20%",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      colors: {
        primary: "#E3350D",
        primaryGray: "#DEDEDE",
        secondaryGray: "#ACAAAA",
        tertiaryGray: "#8A8A8A",
        primaryYellow: "",
        primaryBlue: "",
        primaryGreen: "",
      },
    },
  },
};
