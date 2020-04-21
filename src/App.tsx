import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import React, { Component, ReactElement } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import styles from 'App.scss';
import configureStore from 'store/index';
import Home from 'pages/Home';
import LoginPage from 'pages/Login';

const { Header, Content, Footer, Sider } = Layout;
const store = configureStore();

const isLogin = true;

export default class App extends Component {
  render(): ReactElement {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            {!isLogin ? (
              <Route path="/login" exact>
                <LoginPage />
              </Route>
            ) : (
              <Layout className={styles.app}>
                <Sider breakpoint="lg" collapsedWidth="0">
                  <div className="logo" />
                  <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                      <Link to="/">
                        <UserOutlined />
                        <span className="nav-text">Home</span>
                      </Link>
                    </Menu.Item>
                  </Menu>
                </Sider>
                <Layout>
                  <Header className={styles.header} />
                  <Content className={styles.container}>
                    <div className={styles.content}>
                      <Route path="/" exact>
                        <Home />
                      </Route>
                    </div>
                  </Content>
                  <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
              </Layout>
            )}
          </Switch>
        </Router>
      </Provider>
    );
  }
}
