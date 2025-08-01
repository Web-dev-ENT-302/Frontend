/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        color: theme => ({
          primary: 'var(--primary)',
          primaryHover: 'var(--primary-hover)',
          primary2: 'var(--primary-2)',
          primary3: 'var(--primary-3)',
          primary4: 'var(--primary-4)',
          textHeading: 'var(--heading-text)',
          textBody: 'var(--body-text)',
          textPrimary: 'var(--text-primary)',
          textPrimary2: 'var(--text-primary-2)',
          textPrimary3: 'var(--text-primary-3)'
        }),
      }
    },
  },
  plugins: [],
}

