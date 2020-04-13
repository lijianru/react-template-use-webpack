# 从零搭建一个 React 项目

## webpack

### 工作流程

![ webpack工作流程](http://imweb-io-1251594266.cos.ap-guangzhou.myqcloud.com/5e0f338b2309a844510ed8ca85ccfd23.jpg)
图源[https://imweb.io/topic/5baca58079ddc80f36592f1a](https://imweb.io/topic/5baca58079ddc80f36592f1a)

### loader

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，
并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL(url-loader)。
loader 甚至允许你直接在 JavaScript 模块中 import CSS(css-loader)文件！

### plugins

webpack 插件是一个具有 apply 方法的 JavaScript 对象。apply 方法会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

## 开始搭建

### webpack 构建一个简单的项目

- yarn init：初始化一个 package.json 文件

- yarn add webpack webpack-cli webpack-dev-server html-webpack-plugin --dev

- 在根目录下新建一个 template.html 文件备用，在 HTML 的 body 中添加如下代码

```html
<div id="root"></div>
```

- 在根目录下新建一个 src 文件夹，在文件夹中新建 index.js 备用，在文件中添加如下代码

```javascript
const root = document.getElementById('root')
root.innerText = 'Webpack demo'
```

- 在根目录下新建一个 webpack.config.js 文件，添加如下内容

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.js'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  devServer: {
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './template.html'),
    }),
  ],
}
```

- 在 package.json 中添加两条脚本

```json
"scripts": {
  "start": "webpack-dev-server",
  "build": "webpack"
}
```

> 这时候一个简单的项目已经能够跑起来了

### 集成 Typescript

- yarn add typescript ts-loader --dev

- 将 index.js 改为 index.ts（别忘记给变量加类型）

- 将 webpack 中 entry 中配置的入口 index.js 改为 index.ts

- 在 webpack 中加入解析 ts 的 loader

```javascript
module: {
  rules: [
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
    },
  ]
}
```

- 运行 tsc --init，生成 tsconfig.json 文件

### 集成 React

- yarn add react react-dom

- yarn add @types/react @types/react-dom ts-loader --dev

- 更改 index.ts 为 index.tsx，并将内容改为如下

```javascript
import * as React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<div>Webpack Demo</div>, document.getElementById('root'))
```

- 将 tsconfig.js 中的 jsx 配置改为："jsx": "react"

- 更改 webpack.config.js 中的配置，将入口改为 index.tsx

> 尝试启动项目

- 在 src 目录下新建 App.tsx、pages 和 components 文件夹，并在里面新建 Home 页面和 Header 组件，并更改引用，让它成为一个完整的项目

> 尝试重新启动，但是发现它报错了，错误信息如下。这是因为 resolve.extensions 的默认值为[".js", ".json"]

```
Module not found: Error: Can't resolve './App' in 'D:\demo\webpack-demo\src'
```

- 更改 webpack.config.js 配置，添加如下配置

```javascript
resolve: {
  extensions: ['.ts', '.tsx', '.js']
}
```

> 这时候一个拥有 Typescript、React 的项目就搭建完成了。

### 集成 Sass

- yarn add node-sass sass-loader style-loader css-loader@1.0.1 sass fibers

- 在 webpack 中添加如下配置
  > 将 sass 代码编译成可用的样式代码需要用到三个 loader，所以就会产生顺序问题，
  > 首先 sass-loader 将 sass 代码编译为 css(默认使用 node-sass)，
  > 然后 css-loader 将编译出来的代码再次编译成为符合 CommonJS 的代码，最后 style-loader 将第二步编译出来的代码转为 js 代码

```
{
    test: /\.scss$/,
    include: [path.join(__dirname, './src')],
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}
```

- 在 Home 组件下新建 styles.scss 并在组件中引入

```javascript
import './styles.scss'
```

- 配置 sass 公共的样式
  - src 目录下新建 styles 文件夹
  - 在 styles 文件夹下新建 var.scss，并加入如下代码
  ```scss
  $red: red;
  ```
  - 在其他 css 文件中引入
  ```scss
  @import '../../styles/var.scss';
  ```

### 集成 CSS modules

- yarn add @teamsupercell/typings-for-css-modules-loader

- 用 @teamsupercell/typings-for-css-modules-loader 替代 css-loader

```javascript
  {
    test: /\.scss$/,
    include: [path.join(__dirname, './src')],
    use: [
      'style-loader',
      '@teamsupercell/typings-for-css-modules-loader',
      {
        loader: 'css-loader',
        options: { modules: true },
      },
    ]
  }
```

- 更改 css 的引入方式

```javascript
import styles from './styles.scss'
```

- 这时候可以看见一个错误提示`TS2307: Cannot find module './styles.scss'.`，
  在根目录下新建一个 types 目录创建一个 typed-css-modules.d.ts 的文件，内容如下：

```
declare module '*.scss' {
    const content: any
    export = content
}
```

### 集成 Antd

- yarn add antd

- yarn add ts-import-plugin less less-loader

- 修改 webpack 配置，更改 ts-loader 配置

```javascript
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      getCustomTransformers: () => ({
        before: [tsImportPluginFactory({
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: true
        })]
      }),
      compilerOptions: {
        module: 'es2015'
      }
    },
    exclude: /node_modules/
  }
```

- 在 loader 下加入编译 less 的 loader

```javascript
  {
    test: /\.less$/,
    include: [path.resolve('node_modules')],
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        }
      }
    ]
  }
```

- 在根目录下新建一个 theme.js，用于修改 antd 的主题，并修改 less-loader 下的配置

```javascript
// theme.js
module.exports = {
  'primary-color': '#1DA57A',
  'link-color': '#1DA57A',
  'border-radius-base': '2px'
}

// webpack
const theme = require('./theme')
{
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        modifyVars: theme
    }
}
```

### 集成 React-router-dom

- yarn add react-router-dom

- yarn add @types/react-router-dom --dev

- 在 webpack 的 devServer 中加入`historyApiFallback: true`

### 集成 redux

- yarn add redux react-redux redux-thunk redux-logger

- yarn add @types/react-redux @types/redux-logger @types/redux-thunk redux-devtools-extension

- 在 src 目录下新建 store 文件夹，并在其中建立 actions 和 reducers 文件夹
- 在 actions 中新建 example.ts 文件

```typescript
import { ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import axios from 'axios'

import { Example, ExampleState } from '../reducers/exampleReducer'

// action type 的枚举
export enum ExampleActionTypes {
  SET_FETCHING = 'set fetching',
  SET_FETCHED = 'set fetched',
  SET_FETCH_ERROR = 'set fetch error',
}

// 各种Action的类型
export interface SetFetchingAction {
  type: ExampleActionTypes.SET_FETCHING
  isLoading: boolean
}
export interface SetFetchedAction {
  type: ExampleActionTypes.SET_FETCHED
  examples: Example[]
}
export interface SetFetchErrorAction {
  type: ExampleActionTypes.SET_FETCH_ERROR
  error: Error
}

// Action的类型
export type ExampleAction = SetFetchingAction | SetFetchedAction | SetFetchErrorAction

// 创建action
export const setFetching = (isLoading: boolean): SetFetchingAction => {
  return {
    type: ExampleActionTypes.SET_FETCHING,
    isLoading,
  }
}
export const setFetched = (examples: Example[]): SetFetchedAction => {
  return {
    type: ExampleActionTypes.SET_FETCHED,
    examples,
  }
}
export const setFetchError = (error: Error): SetFetchErrorAction => {
  return {
    type: ExampleActionTypes.SET_FETCH_ERROR,
    error,
  }
}

export const getAllExamples: ActionCreator<ThunkAction<
  Promise<void>,
  ExampleState,
  null,
  SetFetchedAction
>> = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(setFetching(true))
    try {
      const response = await axios.get('https://cnodejs.org/api/v1/topics')
      dispatch(setFetched(response.data.data))
    } catch (err) {
      dispatch(setFetchError(err))
    }
  }
}
```

- 在 reducer 中新建 example.ts 文件

```typescript
import { Reducer } from 'redux'
import { ExampleAction, ExampleActionTypes } from '../actions/exampleAction'

export interface Example {
  id: string
}

export interface ExampleState {
  readonly isLoading: boolean
  readonly examples: Example[]
  readonly error?: Error
}

const initialExampleState: ExampleState = {
  isLoading: false,
  examples: [],
}

export const exampleReducer: Reducer<ExampleState, ExampleAction> = (
  state = initialExampleState,
  action
) => {
  switch (action.type) {
    case ExampleActionTypes.SET_FETCHING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case ExampleActionTypes.SET_FETCHED:
      return {
        ...state,
        examples: action.examples,
      }
    case ExampleActionTypes.SET_FETCH_ERROR:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}
```

- 在 store 文件夹下新建 index.ts 文件

```typescript
import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

// 导入 reducers and state type
import { characterReducer, CharacterState } from './reducers/characterReducer'
import { exampleReducer, ExampleState } from './reducers/exampleReducer'

// 为App创建一个State type
export interface AppState {
  characterState: CharacterState
  exampleState: ExampleState
}

// 创建 root reducer
const rootReducer = combineReducers<AppState>({
  characterState: characterReducer,
  exampleState: exampleReducer,
})

const composeEnhancers = composeWithDevTools({
  // 在这里指定名称，actionsBlacklist, actionsCreators和其他选项如果需要
})

// 创建store
export default function configureStore(): Store<AppState> {
  return createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(thunk, createLogger()))
  )
}
```

### 开发体验优化

#### 优化引用路径

- yarn add --dev tsconfig-paths-webpack-plugin

- 更改 webpack.config.js 配置

```javascript
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

resolve: {
  plugins: [
    new TsconfigPathsPlugin({
      configFile: path.join(__dirname, './tsconfig.json'),
    }),
  ]
}
```

- 更改 tsconfig.json

```json
"baseUrl": "./src",
"paths": {
    "components": ["components/*"],
    "pages": ["pages/*"]
},
```

> 现在我们将引用的路径更改后，重启

#### 热更替

> 在这里我们使用 webpack 内置的热更替模块

- 更改 webpack.config.js 配置

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

- 更改 index.tsx

```javascript
const render = (Component: any) => {
  ReactDOM.render(<Component />, document.getElementById('root'))
}

render(App)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./App.tsx', function() {
    console.log('更新了！')
    const NextComponent = require('./App').default
    render(NextComponent)
  })
}
```

#### eslint & prettier

- yarn add eslint prettier --dev

- ./node_modules/.bin/eslint --init 按照它询问的问题最终生成一个 eslint 的配置文件

- 在根目录下创建一个 prettier.config.js 的文件并在里边加入如下配置

```javascript
module.exports = {
  bracketSpacing: true,
  printWidth: 100,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
}
```

#### source-map

- 在 tsconfig.json 中将 source-map 设置为 true
- 在 webpack.dev.js 中将加入 devtool: 'cheap-module-eval-source-map'
- 在 webpack.build.js 中将加入 devtool: 'source-map'

### build

在之前我们在 package.json 中添加了一条配置`"build": "webpack"`，并没有区分环境。
接下来我们先将 webpack 的配置区分开来，然后再分别配置测试和生产环境。

- yarn add webpack-merge --dev

- 在根目录下建立 webpack.dev.js 和 webpack.build.js 文件并将原 webpack.config.js 重命名为 webpack.common.js

```javascript
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: {
    app: path.join(__dirname, './src/index.tsx'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
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
  plugins: [new Webpack.NamedModulesPlugin(), new Webpack.HotModuleReplacementPlugin()],
})
```

```javascript
const webpackMerge = require('webpack-merge')
const webpackCommon = require('./webpack.common.js')

module.exports = webpackMerge(webpackCommon, {})
```

- 将之前 package.json 中的两条脚本改为如下

```
"scripts": {
    "start": "webpack-dev-server --config ./webpack.dev.js",
    "build:dev": "webpack --config ./webpack.build.js",
    "build:prod": "webpack --config webpack.build.js"
},
```

之前我们一直没有区分环境，在这里我们将添加环境变量

- yarn add cross-env --dev

- 更改 package.json 中的脚本改为如下

```
"build:dev": "cross-env ENV=development webpack --config ./webpack.build.js",
"build:prod": "cross-env ENV=production webpack --config webpack.build.js"
```

- 更改 webpack.build.js

```javascript
const env = process.env.ENV

module.exports = webpackMerge(webpackCommon, {
  mode: env,
})
```

在每次 build 之前我们应该清空 dist 文件夹

- yarn add rimraf --dev

- 添加一条删除的脚本并在 build 之前先执行一次

```
"scripts": {
    "clear": "rimraf ./dist/*",
    "start": "webpack-dev-server --config ./webpack.dev.js",
    "build:dev": "yarn clear && cross-env ENV=development webpack --config ./webpack.build.js",
    "build:prod": "yarn clear && cross-env ENV=production webpack --config webpack.build.js"
}
```

至此，所有的 build 准备工作已经做完

#### 代码分割

如果观察过前一步 build 出的文件你会发现所有的 JS 文件都只在 app.js 文件中，现在我们将 node_modules 中的文件单独打包为一个文件，
逻辑代码单独 build 为一个文件。webpack.build.jsz 中增加配置如下：

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

- webpack.build.jsz 中增加配置

```javascript
optimization: {
  minimizer: [
    new UglifyJsPlugin({
      parallel: true,
      cache: true,
    }),
  ]
}
```

#### 缓存

对于一些不变的文件我们应该在客户端缓存，对于一些业务类型的代码应该在每次部署上线的时候避免使用之前的缓存。

- contenthash：根据内容的唯一 hash
- chunkhash：根据 chunk 的唯一 hash
- hash：每次在 build 的时候会变化

将之前的 output 的配置挪到 webpack.dev.js，在 webpack.build.js 中增加如下配置：

```
output: {
  path: path.join(__dirname, './dist'),
  filename: '[name].[contenthash].js'
}
```

## TODO

- [x] ESlint
- [x] prettier
- [ ] other loader
- [x] AntD
- [x] Redux
- [x] axios
- [x] router
- [ ] 服务端渲染

  - - -
