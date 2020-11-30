module.exports = {
  purge: [
    "./app/views/layouts/**/*",
    "./app/javascript/**/*.js",
    "./app/javascript/**/*.jsx",
    "./app/javascript/**/*.ts",
    "./app/javascript/**/*.tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
