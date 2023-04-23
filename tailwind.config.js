module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#fff',
        secondary: '#f2f4f7',
        ternary: '#7c818e',
      },

      minWidth: {
        '1/2': '50%',
        '1/3': '30%',
      },

      spacing: {
        125: '500px',
      },
    },
  },
  plugins: [],
}
