import { Layout, Menu } from 'antd';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { UserOutlined } from '@ant-design/icons';
import React, { ReactElement, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

import { AppState } from 'store/index';
import { Auth } from 'store/reducers/loginReducer';

import Home from 'pages/Home';
import LoginPage from 'pages/Login';
import NotFound from 'pages/NotFound';
import RootHeader from 'components/RootHeader';

import styles from './styles.scss';

const { Content, Footer, Sider } = Layout;

const authSelector = (state: AppState): Auth => state.loginState.auth;

const tokenSelector = createSelector(authSelector, (auth: Auth) => auth.token);

const RootLayout = (): ReactElement => {
  const token = useSelector(tokenSelector);
  const history = useHistory();

  useEffect(() => {
    token && history.push('/home');
    !token && history.push('/login');
  }, [token, history]);

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
        <RootHeader />
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

export default RootLayout;
