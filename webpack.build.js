const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.ENV

module.exports = webpackMerge(webpackCommon, {
  mode: env,
  optimization: {
    // 缓存webpack固定生成的代码块
    runtimeChunk: {
      name: 'manifest'
    },
    // 指定需要进行分块的代码和分块后的文件名
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          // 匹配需要分割的chunk
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // 控制抽取模块范围的方式
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: true
      })
    ]
  }
})
