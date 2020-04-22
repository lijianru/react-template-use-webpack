import { Layout, Menu, Button } from 'antd';
import { Provider, useSelector, useDispatch } from 'react-redux';
import React, { Component, ReactElement, useEffect, useCallback } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { createSelector } from 'reselect';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import styles from 'App.scss';
import configureStore, { AppState } from 'store/index';
import Home from 'pages/Home';
import LoginPage from 'pages/Login';
import NotFound from 'pages/NotFound';
import { Auth } from 'store/reducers/loginReducer';
import { logout } from 'store/actions/loginAction';

const { Header, Content, Footer, Sider } = Layout;
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

const authSelector = (state: AppState): Auth => state.loginState.auth;

const tokenSelector = createSelector(authSelector, (auth: Auth) => auth.token);
const usernameSelector = createSelector(authSelector, (auth: Auth) => auth.username);

const RootLayout = (): ReactElement => {
  const token = useSelector(tokenSelector);
  const username = useSelector(usernameSelector);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    token && history.push('/home');
    !token && history.push('/login');
  }, [token, history]);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!token) {
    return (
      <Switch>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
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
        <Header className={styles.header}>
          <span>
            欢迎 <b>{username}</b>!
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a onClick={logoutHandler}>登出</a>
        </Header>
        <Content className={styles.container}>
          <div className={styles.content}>
            <Switch>
              <Route path="/home" exact>
                <Home />
              </Route>
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
