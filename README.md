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

> 尝试启动项目

- 在src目录下新建App.tsx、pages和components文件夹，并在里面新建Home页面和Header组件，并更改引用，让它成为一个完整的项目

> 尝试重新启动，但是发现它报错了，错误信息如下。这是因为resolve.extensions的默认值为[".js", ".json"]
```
Module not found: Error: Can't resolve './App' in 'D:\demo\webpack-demo\src'
```

- 更改webpack.config.js配置，添加如下配置
```javascript
resolve: {
  extensions: ['.ts', '.tsx', '.js']
}
```

> 这时候一个拥有Typescript、React的项目就搭建完成了。

### 开发体验优化
#### 优化引用路径
- yarn add --dev tsconfig-paths-webpack-plugin

- 更改webpack.config.js配置
```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

resolve: {
    plugins: [new TsconfigPathsPlugin({
      configFile: path.join(__dirname, './tsconfig.json')
    })]
}
```

- 更改tsconfig.json
```json
"baseUrl": "./src",
"paths": {
    "Components": ["components/*"],
    "Pages": ["pages/*"]
}, 
```
> 现在我们将引用的路径更改后，重启

#### 热更替
> 在这里我们使用webpack内置的热更替模块
- 更改webpack.config.js配置
```javascript
const Webpack = require('webpack')

devServer: {
    hot: true
},
plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
]
```

- 更改index.tsx
```javascript
const render = (Component: any) => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./App.tsx', function () {
    console.log('更新了！')
    const NextComponent = require('./App').default
    render(NextComponent)
  })
}
```

### build
在之前我们在package.json中添加了一条配置`"build": "webpack"`，并没有区分环境。
接下来我们先将webpack的配置区分开来，然后再分别配置测试和生产环境。

- yarn add webpack-merge --dev

- 在根目录下建立webpack.dev.js和webpack.build.js文件并将原webpack.config.js重命名为webpack.common.js
```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx')
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js'
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
  ]
}
```

```javascript
const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')
const Webpack = require('webpack')

module.exports = webpackMerge(webpackCommon, {
  devServer: {
    open: true,
    hot: true,
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
})
```

```javascript
const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')

module.exports = webpackMerge(webpackCommon, {})
```

- 将之前package.json中的两条脚本改为如下
```
"scripts": {
    "start": "webpack-dev-server --config ./webpack.dev.js",
    "build:dev": "webpack --config ./webpack.build.js",
    "build:prod": "webpack --config webpack.build.js"
},
```

之前我们一直没有区分环境，在这里我们将添加环境变量
- yarn add cross-env --dev

- 更改package.json中的脚本改为如下
```
"build:dev": "cross-env ENV=development webpack --config ./webpack.build.js",
"build:prod": "cross-env ENV=production webpack --config webpack.build.js"
```

- 更改webpack.build.js
```javascript
const env = process.env.ENV

module.exports = webpackMerge(webpackCommon, {
  mode: env
})
```

在每次build之前我们应该清空dist文件夹
- yarn add rimraf --dev

- 添加一条删除的脚本并在build之前先执行一次
```
"scripts": {
    "clear": "rimraf ./dist/*",
    "start": "webpack-dev-server --config ./webpack.dev.js",
    "build:dev": "yarn clear && cross-env ENV=development webpack --config ./webpack.build.js",
    "build:prod": "yarn clear && cross-env ENV=production webpack --config webpack.build.js"
}
```
至此，所有的build准备工作已经做完

#### 代码分割
如果观察过前一步build出的文件你会发现所有的JS文件都只在app.js文件中，现在我们将node_modules中的文件单独打包为一个文件，
逻辑代码单独build为一个文件。webpack.build.jsz中增加配置如下：
```
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
  }
```

#### 代码压缩
- yarn add uglifyjs-webpack-plugin --dev

- webpack.build.jsz中增加配置
```javascript
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      cache: true
    })
  ]
}
```

#### 缓存
对于一些不变的文件我们应该在客户端缓存，对于一些业务类型的代码应该在每次部署上线的时候避免使用之前的缓存。
- contenthash：根据内容的唯一hash
- chunkhash：根据chunk的唯一hash
- hash：每次在build的时候会变化

更改webpack.common.js中的配置：
```
output: {
  path: path.join(__dirname, './dist'),
  filename: '[name].[contenthash].js'
}
```

