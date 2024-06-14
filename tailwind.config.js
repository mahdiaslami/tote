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
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        mute: 'rgb(var(--color-mute) / <alpha-value>)',
        pen: 'rgb(var(--color-pen) / <alpha-value>)'
      },

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },

      animation: {
        wiggle: 'wiggle 0.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
