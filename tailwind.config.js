module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
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
