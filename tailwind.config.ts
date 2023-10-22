import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'main-white': '#F8F8F8',
        primary: '#0337E7',
        'disabled-bg': '#D5D6D9',
        'disabled-text': '#BBB9B9'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: false
  }
}
export default config
