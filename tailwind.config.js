/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    
    extend: {
      fontFamily:{
        'Lobster':'Lobster',
        "SofiaSans":'Sofia Sans'
      },
      colors:{
      current: 'currentColor',
      basisBlack:'#23232D',
      cardGreen:'#8AC187',
      white:'#FCFFFD',
      orange:'#FED47E',
      purple:'#FFAAC7',
      blue:'#776AD6',
      justBlack:'17181C'
    },
    },
  },
  plugins: [],
}