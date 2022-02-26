function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: withOpacityValue('--color-primary-light'),
          DEFAULT: withOpacityValue('--color-primary-default'),
          dark: withOpacityValue('--color-primary-dark'),
          darker: withOpacityValue('--color-primary-darker'),
        },
      },
    },
  },
  plugins: [],
}
