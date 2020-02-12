import * as React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

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
