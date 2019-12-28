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

### 集成Typescript
- yarn add typescript ts-loader --dev

- 将index.js改为index.ts（别忘记给变量加类型）

- 将webpack中entry中配置的入口index.js改为index.ts

- 在webpack中加入解析ts的loader
```javascript
module: {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: "ts-loader"
        }
    ]
}
```

- 运行tsc --init，生成tsconfig.json文件

### 集成React
- yarn add react react-dom

- yarn add @types/react @types/react-dom ts-loader --dev

- 更改index.ts为index.tsx，并将内容改为如下
```javascript
import * as React from "react";
import ReactDOM from 'react-dom'

ReactDOM.render(<div>Webpack Demo</div>, document.getElementById('root'))
```

- 将tsconfig.js中的jsx配置改为："jsx": "react"

- 更改webpack.config.js中的配置，将入口改为index.tsx

> 这时候一个拥有Typescript、React的项目就搭建完成了。
