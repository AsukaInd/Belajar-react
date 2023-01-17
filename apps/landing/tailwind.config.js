/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          custom: '#005AA6',
        },
        black: {
          custom: '#333333',
        }
      },
      boxShadow: {
        header: "4px 10px 40px rgba(0, 0, 0, 0.06)",
        "btn-shadow": "0px 6px 20px rgba(0, 90, 166, 0.2)"
      }
    },
  },
  plugins: [
    require("tailwindcss-radix")()
  ],
}
