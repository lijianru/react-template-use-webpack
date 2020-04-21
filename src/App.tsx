import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import React, { Component, ReactElement } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import styles from 'App.scss';
import configureStore from 'store/index';
import Home from 'pages/Home';
import LoginPage from 'pages/Login';
import NotFound from 'pages/NotFound';

const { Header, Content, Footer, Sider } = Layout;
const store = configureStore();

const isLogin = !!localStorage.getItem('token');

export default class App extends Component {
  render(): ReactElement {
    return (
      <Provider store={store}>
        <Router>
          <RootLayout />
        </Router>
      </Provider>
    );
  }
}

const RootLayout = (): ReactElement => {
  if (!isLogin) {
    return (
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="*" exact render={(): ReactElement => <Redirect to="/login" />} />
      </Switch>
    );
  }

  return (
    <Layout className={styles.app}>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home">
              <UserOutlined />
              <span>Home</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header} />
        <Content className={styles.container}>
          <div className={styles.content}>
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
              <Route path="/login" exact render={(): ReactElement => <Redirect to="/home" />} />
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer className={styles.footer}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};
