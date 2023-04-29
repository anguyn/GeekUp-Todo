/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-bottom": {
          "0%": {
            transform: "translateY(30%)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        "fade-out-top": {
          "0%": {
            transform: "translateY(0)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(-30%)",
            opacity: 0,
          },
        },
      },
      animation: {
        "fade-in-bottom": "fade-in-bottom 0.5s ease-out",
        "fade-out-top": "fade-out-top 0.5s ease-in",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
    daisyui: {
      themes: ["cupcake", "dark", "light", "cmyk"],
    },
  },
};
