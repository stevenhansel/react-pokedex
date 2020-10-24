module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  theme: {
    extend: {
      screens: {
        xs: { max: "400px" },
      },
      colors: {
        primary: "#E3350D",
        primaryGray: "#919191",
        primaryRed: "",
        primaryYellow: "",
        primaryBlue: "",
        primaryGreen: "",
      },
    },
  },
};
