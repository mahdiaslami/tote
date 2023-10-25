/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    fontFamily: {
      default: ['Montserrat', 'Vazirmatn'],
    },

    extend: {
      colors: {
        primary: '#fafafa',
        secondary: '#f1f5f9',
        success: {
          'DEFAULT': '#059669',
          1: '#059669',
          2: '#ecfdf5',
        },
        mute: '#94a3b8',
        pen: '#262626'
      }
    },
  },
  plugins: [],
}
