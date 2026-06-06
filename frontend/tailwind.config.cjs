module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        card: 'var(--card)',
        'muted-foreground': 'var(--muted-foreground)',
        neon: 'var(--neon)',
        violet: 'var(--violet)'
      }
    },
  },
  plugins: [],
}
