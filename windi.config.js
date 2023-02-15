import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#016D77',
          50: '#32ECFD',
          100: '#1EEAFD',
          200: '#02DCF0',
          300: '#02B7C8',
          400: '#01929F',
          500: '#016D77',
          600: '#013A3F',
          700: '#000708',
          800: '#000000',
          900: '#000000'
        },
        'cornflower-blue': {
          DEFAULT: '#5865F2',
          50: '#FFFFFF',
          100: '#EFF1FE',
          200: '#CACEFB',
          300: '#A4ABF8',
          400: '#7E88F5',
          500: '#5865F2',
          600: '#2435EE',
          700: '#101FCA',
          800: '#0C1796',
          900: '#080F62'
        }
      }
    }
  },
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next']
  }
});
