const pxtoviewport = require('postcss-px-to-viewport')

module.exports = {
  devServer: {
    proxy: 'http://cs.7youke.com',
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // green: '#ffb000',
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
