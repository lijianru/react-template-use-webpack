const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const env = process.env.ENV

module.exports = webpackMerge(webpackCommon, {
  mode: env
})
