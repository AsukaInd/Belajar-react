/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          1: '#4dabf7',
          2: '#2854F6',
          3: '#0E8ED9',
          4: '#0074B7'
        },
        black: {
          1: "#242323"
        },
        white: {
          1: "#FFFFFF",
          fa: "#fafbff",
          e9: "#E9E9E9",
          f4: "#F4F6FF"
        },
        grey: {
          1: "#7A7A7A",
          d4: "#4d4c4c",
          a7: "#7a7a7a"
        },
        green: {
          1: '#00A65A'
        },
        red: {
          1: '#EB4646'
        }
      },
      boxShadow: {
        custom: "0px 4px 16px rgba(36, 35, 35, 0.05)",
        'custom-1': '0px 4px 16px rgba(36, 35, 35, 0.1)'
      },
      gridTemplateColumns: {
        "15": 'repeat(15, minmax(0, 1fr))'
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
    divideStyle: true
  },
};
