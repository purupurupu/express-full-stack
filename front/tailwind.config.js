// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // ダークモードを有効にする
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
