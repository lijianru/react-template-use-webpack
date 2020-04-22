import { Provider } from 'react-redux';
import React, { Component, ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from 'store/index';
import RootLayout from 'components/RootLayout';

const store = configureStore();
const persistor = persistStore(store);

export default class App extends Component {
  render(): ReactElement {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <RootLayout />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
