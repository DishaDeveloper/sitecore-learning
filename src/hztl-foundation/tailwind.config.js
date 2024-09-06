/** @type {import('tailwindcss').Config} */
const figmaVariables = require('./theme-config').theme;
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#2F2D2E',
        darkprimary: '#055164', // Dark Blue
        error: '#B91515',
        gray: '#A7A7A7', // Charcoal
        green: '#4CAF4F',
        primary: '#6BA69E', // Teal
        secondary: '#F8A997', // Salmon
        transparent: 'transparent',
        white: '#FFFFFF',
        'dark-blue': '#065264',
        'dark-gray': '#666666',
        'dark-green': '#388E3B',
        'error-outline': '#DF2626',
        'extralight-gray': '#ABBED1',
        'grayscale-w-200': '#EAE8E8',
        'grayscale-w-400': '#787779',
        'grayscale-w-600': '#373432',
        'light-black': '#454545',
        'light-gray': '#E2E2E2',
        'light-green': '#7FC3BA',
        'medium-gray': '#89939E',
        'mild-gray': '#F2F2F2',
        ...figmaVariables.colors,
      },
      fontSize: {
        // Desktop font sizes
        xxl: ['3.5rem', '120%'], //56px 67.2px
        xl: ['3rem', '3.5rem'], //48px 60px
        l: ['2rem', '2rem'], //32px 67.2px
        m: ['1.5rem', '2rem'], //24px 32px
        'sub-heading': ['1.25rem', '1.52rem'], //20px 24px
        s: ['1.125rem', '1.75rem'], //18px 28px
        xs: ['1rem', '1.25rem'], //16px 20px
        xxs: ['0.75rem', '1rem'], //12px 16px
        body: ['0.875rem', '157%'], //14px 21.98px
        'large-body': ['1.125rem', '133%'], //18px 23.94px
        button: ['0.875rem', '120%'], //14px 16.8px
        'text-link': ['0.875rem', '0.875rem'], //14px 14px
        small: ['0.75rem', '130%'], //12px 15.6px
        legal: ['0.625rem', '130%'], //10px 13px
        base: ['1rem', '1.125rem'], //16px 18px

        // Mobile font sizes
        'sm-xxl': ['2rem', '120%'], //32px 38.4px
        'sm-xl': ['2rem', '120%'], //32px 38.4px
        'sm-l': ['2rem', '120%'], //32px 38.4px
        'sm-m': ['1.5rem', '2rem'], //24px 32px
        'sm-s': ['1.25rem', '1.75rem'], //20px 28px
        'sm-xs': ['1rem', '1.25rem'], //16px 20px
        'sm-xxs': ['0.75rem', '1rem'], //12px 16px
      },
      fontFamily: {
        modern: ['Modern Era', 'sans-serif'],
        ...figmaVariables.typography.fontFamily,
      },
      fontWeight: {
        bold: '700',
        heavy: '600',
        'semi-bold': '600',
        medium: '500',
        regular: '400',
        'extra-light': '300',
      },
      lineHeight: {
        20: '4.4rem', // 48
        16: '3.5rem', // 48
        12: '3rem', // 48
        2: '1.375rem', // 22
        1: '1.188rem', // 19
      },
      screens: {
        xl: '1488px',
        lg: '1248px',
        mml: '1024px',
        ml: '1008px',
        mmd: '800px',
        md: '672px',
        sm: '375px',
      },
      spacing: {
        xxl: '7.5rem', // 120px
        xl: '5rem', // 80px
        l: '2.5rem', // 40px
        ml: '2rem', // 32px
        m: '1.5rem', // 24px
        s: '1rem', // 16px
        xs: '0.75rem', // 12px
        xxs: '0.5rem', // 8px
        xxxs: '0.25rem', // 4px
        0: '0px',
        ...figmaVariables.spacing,
      },
    },
  },
  plugins: [],
};
