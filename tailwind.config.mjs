/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        'background-light': '#f8f9fa',
        'background-dark': '#0a0a0a',
        'text-light': '#1f2937',
        'text-dark': '#e5e7eb',
        'subtext-light': '#6b7280',
        'subtext-dark': '#9ca3af',
        'border-light': '#e5e7eb',
        'border-dark': '#374151',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
