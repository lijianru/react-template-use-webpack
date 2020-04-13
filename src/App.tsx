import { Layout } from 'antd';
import { Provider } from 'react-redux';
import React, { Component, ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import styles from 'App.scss';
import Routers from './Routers';
import Navigation from './components/Navigation';
import configureStore from './store';

const { Header, Content, Footer } = Layout;
const store = configureStore();

export default class App extends Component {
  render(): ReactElement {
    return (
      <Provider store={store}>
        <Router>
          <Layout className={styles.app}>
            <Navigation />
            <Layout>
              <Header className={styles.header} />
              <Content className={styles.container}>
                <div className={styles.content}>
                  <Routers />
                </div>
              </Content>
              <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
          </Layout>
        </Router>
      </Provider>
    );
  }
}
