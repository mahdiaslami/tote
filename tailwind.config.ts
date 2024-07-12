import type { Config } from 'tailwindcss'

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
        line: 'rgb(var(--color-line) / <alpha-value>)',
        mute: 'rgb(var(--color-pen-secondary) / <alpha-value>)',
        pen: 'rgb(var(--color-pen-primary) / <alpha-value>)'
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

      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '18': '4.5rem',
      }
    },
  },
  plugins: [],
} satisfies Config