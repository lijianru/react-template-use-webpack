const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')

module.exports = webpackMerge(webpackCommon, {})
