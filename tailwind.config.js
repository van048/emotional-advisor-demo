module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ...其他颜色层级
        }
      },
      spacing: {
        '9/16': '56.25%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}