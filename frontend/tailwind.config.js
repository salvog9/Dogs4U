/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      orange : '#fb8a22',
      beige : '#d8cabd',
      white : '#efefe5',
      black : '#3f2624',
      pink: '#d9376e',
      red: "#ff0000",
      green: "#50C878",
      transparent : "transparent"
    },
    extend: {
      keyframes:{
        width : {
          '0%' : { width : 'full'},
          '100%' : { width : '0'}
          
        }
      }
    },
    animation: {
      width : 'width 3s linear'
    }
  },
  plugins: [],
}

