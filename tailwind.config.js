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
          green: "#00B800",
        },
        // green: {
        //   light: '#F0FFF2',
        // }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
