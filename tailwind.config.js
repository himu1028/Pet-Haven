// tailwind.config.js (ES Module syntax)
import flowbite from 'flowbite';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite//*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite
],
};