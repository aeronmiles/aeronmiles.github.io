let gzipStatic = require('connect-gzip-static')
// require('fs').mkdir('dist', (err) => console.log(err))

module.exports = (config) => {
  config.addFilter('prettyDate', require('./src/_config/prettyDate.js'))
  config.addPassthroughCopy({ public: './' })
  config.addPassthroughCopy('./src/.nojekyll')
  config.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  config.addPassthroughCopy('node_modules/@webcomponents/webcomponentsjs')
  config.addPassthroughCopy('node_modules/lit/polyfill-support.js')
  config.setBrowserSyncConfig({
    files: [
      {
        match: ['dist/assets/*.css', 'dist/assets/*.js'],
        fn: function (event, file) {
          this.reload();
        }
      }],
    open: true,
    middleware: [gzipStatic(__dirname + '/dist')],
    snippetOptions: {
      rule: {
        fn: function (snippet, match) {
          return snippet + match
        },
        match: /<\/head>/i,
      },
    }
  })
  config.setDataDeepMerge(true)
  config.setLibrary('md', require('./src/_config/markdown.js'))
  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    markdownTemplateEngine: false,
  }
}
