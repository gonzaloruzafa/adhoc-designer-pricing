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
        },
      },
      fontFamily: {
        sans: ['Apercu Pro', 'system-ui', 'sans-serif'],
        display: ['New Kansas', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
