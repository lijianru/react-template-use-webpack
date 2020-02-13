const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, './src')],
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              // 使用css modules
              modules: true,
              // 类型导出
              namedExport: true,
              // 支持驼峰
              camelCase: true,
              // 使用sass
              sass: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({
      configFile: path.join(__dirname, './tsconfig.json')
    })]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './template.html')
    })
  ]
}
