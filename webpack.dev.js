const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const Webpack = require('webpack')

module.exports = webpackMerge(webpackCommon, {
  devServer: {
    open: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
})
