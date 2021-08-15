module.exports = {
  mode: "jit",
  purge: [
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#fb4628",
          blue: "#00acff",
          yello: "#ffbf00",
          green: "#00cd3d",
        },
        green: {
          light: "#D9F7D9",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
