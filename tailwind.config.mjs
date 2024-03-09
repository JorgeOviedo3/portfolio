/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        maingray: "#E0E2F0",
        mainblue: "#569ED3",
      },
      fontFamily: {
        outfit: ["Outfit"],
        mochiy: ["Mochiy Pop One"],
        sora: ["Sora"],
        zipper: ["Zipper"],
      },
    },
  },
  plugins: [],
};
