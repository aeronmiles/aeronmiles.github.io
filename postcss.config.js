const isProduction = process.env.NODE_ENV === 'prod';

const plugins = [
  require('postcss-import'),
  require('tailwindcss/nesting'),
  require('tailwindcss'),
  require('autoprefixer'),
];

// Only push cssnano to the plugins array in production
if (isProduction) {
  plugins.push(require('cssnano'));
}

module.exports = {
  plugins: plugins,
}
