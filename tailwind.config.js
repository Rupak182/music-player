/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow:{
        'sm':'0 0 20px 0 rgb(201, 59, 118)',
        'xl':'0 0 40px 0 rgb(201, 59, 118)'

      }
    },
  },
  plugins: [],
}
