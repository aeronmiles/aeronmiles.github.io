module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('autoprefixer'),
    require('tailwindcss'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : null,
  ],
}
