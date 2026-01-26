import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        adhoc: {
          violet: '#7C6CD8',
          lavender: '#BCAFEF',
          coral: '#FF7348',
          mustard: '#FEA912',
          deep: '#1A1D2D', // New premium deep blue
          gold: '#CBA35C', // AdHoc gold for accents
        },
      },
      fontFamily: {
        sans: ['Apercu Pro', 'Inter', 'system-ui', 'sans-serif'],
        display: ['New Kansas', 'Outfit', 'Georgia', 'serif'],
      },
      boxShadow: {
        'premium': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
};

export default config;
