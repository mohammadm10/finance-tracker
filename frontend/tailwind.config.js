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
      fontFamily: {
        burtons: "burtons",
        palatino: "palatino",
        arvo: "arvo"
      },
      colors: {
        'orange': "#F64C72",
        'black': "#010101",
        'blue': "#d3e1eb",
        'grey': "#d6d6d6"
      },
    },
  },
  plugins: [],
}
