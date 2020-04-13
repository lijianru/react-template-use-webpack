const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const theme = require('./theme');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'antd',
                libraryDirectory: 'lib',
                style: true,
              }),
            ],
          }),
          compilerOptions: {
            module: 'es2015',
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        include: [path.join(__dirname, './src')],
        use: [
          'style-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: { modules: true },
          },
        ],
      },
      {
        test: /\.less$/,
        include: [path.resolve('node_modules')],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              // 禁用在样式里写JS
              javascriptEnabled: true,
              // 自定义样式
              modifyVars: theme,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, './tsconfig.json'),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './template.html'),
    }),
  ],
};
