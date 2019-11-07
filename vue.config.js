const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    proxy: 'http://cs.7youke.com',
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          green: '#ffb000',
          'nav-bar-background-color': '@green',
          'nav-bar-icon-color': 'white',
          'nav-bar-text-color': 'white',
          'nav-bar-title-text-color': 'white',
        },
      },
      postcss: {
        plugins: [
          pxtoviewport({
            viewportWidth: 375,
          }),
        ],
      },
    },
  },
}
