/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/js/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'fondo': '#121212',
        'rojo': '#ff0033', // Actualizado con tu rojo del script
        'morado': '#a855f7', // Agregado desde tu script
        'gris-claro': '#B3B3B3',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],      // Agregado desde tu script
        serif: ['Playfair Display', 'serif']  // Agregado desde tu script
      }
    },
  },
  plugins: [],
}