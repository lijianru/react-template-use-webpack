import { Layout } from 'antd';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import React, { ReactElement, useCallback } from 'react';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { Auth } from 'store/reducers/loginReducer';
import { logout } from 'store/actions/loginAction';

import styles from './styles.scss';

const { Header } = Layout;

const authSelector = (state: AppState): Auth => state.loginState.auth;

const usernameSelector = createSelector(authSelector, (auth: Auth) => auth.username);

const RootHeader = (): ReactElement => {
  const username = useSelector(usernameSelector);
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  renderLog('RootHeader render!!!');
  return (
    <Header className={styles.header}>
      <span>
        欢迎 <b>{username}</b>!
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a onClick={logoutHandler}>登出</a>
    </Header>
  );
};

export default RootHeader;
