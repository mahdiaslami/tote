module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#e6ffe6',
          DEFAULT: '#e0f7e0',
          dark: '#b2d8b2',
          darker: '#677767',
        },
      },
    },
  },
  plugins: [],
}
