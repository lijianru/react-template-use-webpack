import React, { ReactElement, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { createSelector } from 'reselect';

import { AppState } from 'store/index';
import { Auth } from 'store/reducers/loginReducer';
import { login } from 'store/actions/loginAction';
import styles from './styles.scss';

interface LoginProps {
  username: string;
  password: string;
}

const tokenSelector = createSelector(
  (state: AppState) => state.loginState.auth,
  (auth: Auth) => auth.token
);

const Login = (): ReactElement => {
  const token = useSelector(tokenSelector);
  const loginError = useSelector((state: AppState) => state.loginState.error?.message);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(token);
    token && localStorage.setItem('token', token);
  }, [token]);

  const onFinish = useCallback(
    (values: any): void => {
      dispatch(login(values));
    },
    [dispatch]
  );

  return (
    <Form
      name="basic"
      labelCol={{ span: 4 }}
      className={styles.loginForm}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <p className={styles.errorMessage}>{loginError}</p>
      </Form.Item>
    </Form>
  );
};

export default Login;
