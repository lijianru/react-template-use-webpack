import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = (Component: any): void => {
  ReactDOM.render(<Component />, document.getElementById('root'));
};

render(App);

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
if (module.hot) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  module.hot.accept('./App.tsx', function () {
    console.log('更新了！');
    const NextComponent = require('./App').default;
    render(NextComponent);
  });
}
