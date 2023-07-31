/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'ligth-gray': '#F3F3F3',
        'gray-normal': 'rgba(147, 155, 159, 0.30)',
        'gray': '#D3D6DA',
        'gray-ligth': 'rgba(218, 220, 224, 0.30)',
        'dark-gray': '#939B9F',
        'white-gray': 'rgba(243, 243, 243, 0.89)',
        'app-green': '#6AAA64',
        'app-yellow': '#CEB02C',
        'app-gray-digit': '#565F7E',
        'app-gray-keyboard': 'rgba(218, 220, 224, 0.03)',
        'app-darkers-gray-less': 'rgba(218, 220, 224, 0.03)',
        'app-darkers-gray': '#262B3C'
      },
      fontSize: {
        'xsamall': '0.9375rem',
        'small': '1.1875rem',
        'small-plus': '1.75rem',
        'medium': '2.1875rem',
        'big': '2.5rem',
    },
    },
  },
  plugins: [],
}
