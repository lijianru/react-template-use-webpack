const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader"
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
    }),
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}
