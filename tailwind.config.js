/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '1/2': '0.125rem', // 2px
        '1': '0.25rem',   // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',    // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',   // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        '56': '14rem',    // 224px
        '64': '16rem',    // 256px
        '72': '18rem',    // 288px
        '80': '20rem',    // 320px
        '96': '24rem',    // 384px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem', // 2px
        'md': '0.375rem', // 6px
        'lg': '0.5rem',   // 8px
        'xl': '0.75rem',  // 12px
        '2xl': '1rem',    // 16px
        '3xl': '1.5rem',  // 24px
        'full': '9999px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],     // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }], // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1' }],       // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
        '8xl': ['6rem', { lineHeight: '1' }],          // 96px
        '9xl': ['8rem', { lineHeight: '1' }],          // 128px
        // Semantic headings
        'h1': ['3rem', { lineHeight: '1' }],           // Equivalent to 5xl
        'h2': ['2.25rem', { lineHeight: '2.5rem' }],   // Equivalent to 4xl
        'h3': ['1.875rem', { lineHeight: '2.25rem' }], // Equivalent to 3xl
        'h4': ['1.5rem', { lineHeight: '2rem' }],      // Equivalent to 2xl
        'h5': ['1.25rem', { lineHeight: '1.75rem' }],  // Equivalent to xl
        'h6': ['1.125rem', { lineHeight: '1.75rem' }],  // Equivalent to lg
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'body-base': ['1rem', { lineHeight: '1.5rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      colors: {
        'primary': {
          600: '#2C7BE5', // Using action-blue as primary-600
        },
        'accent': {
          600: '#1A2A3A', // Using deep-navy as accent-600
        },
        'deep-navy': '#1A2A3A',
        'slate-grey': '#4A5E75',
        'action-blue': '#2C7BE5',
      },
    },
  },
  plugins: [],
}