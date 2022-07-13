/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#006E7F",

          "secondary": "#9A86A4",

          "accent": "#83BD75",

          "neutral": "#F3F4F6",

          "base-100": "#ffffff",

          "info": "#FFE69A",

          "success": "#1BBB70",

          "warning": "#F59E0B",

          "error": "#FF4949",
        },
      },
      {
        light: {
          "primary": "#F76E11",
          "secondary": "#F0A500",
          "accent": "#1A4D2E",
          "base-100": "#FAF3E3",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
