## 从零搭建一个React项目
### webpack构建一个简单的项目
- yarn init：初始化一个package.json文件

- yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin --dev

- 在根目录下新建一个template.html文件备用，在HTML的body中添加如下代码
```html
<div id="root"></div>
```

- 在根目录下新建一个src文件夹，在文件夹中新建index.js备用，在文件中添加如下代码
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './template.html')
    })
  ]
}
```
- 在package.json中添加两条脚本
```json
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack"
}
```
> 这时候一个简单的项目已经能够跑起来了


