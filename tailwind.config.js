/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xxxs: '320px',
        xxs: '360px',
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px'
      },
      boxShadow: {
        custom:
          '0 10px 20px rgba(0, 0, 255, 0.6), 0 10px 30px rgba(255, 255, 0, 0.6), 0 10px 10px rgba(0, 255, 0, 0.6)'
      },
      zIndex: {
        50: '50'
      },
      position: {
        sticky: 'sticky'
      }
    }
  },
  variants: {
    extend: {
      position: ['sticky']
    }
  },
  plugins: []
}
