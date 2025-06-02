/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        inevi_light_lavender: "#dfd8e7",
        inevi_dark_lavender: "#b576f7",
        inevi_dark_purple: "#3b1574",
        inevi_light_gray: "#717171",
        inevi_white: "#ffffff",
      },
      keyframes: {
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -48%)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -50%)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "1",
            transform: "translate(-50%, -50%)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -48%)",
          },
        },
      },

      animation: {
        "slide-down": "slide-down 300ms ease-out forwards",
        "slide-up": "slide-up 300ms ease-in forwards",
      },
      plugins: [],
    },
  },
};
