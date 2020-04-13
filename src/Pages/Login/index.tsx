import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Checkbox } from 'antd';
import { ThunkDispatch } from 'redux-thunk';

import { Auth } from '../../store/reducers/loginReducer';
import { AppState } from '../../store';
import { login } from '../../store/actions/loginAction';

interface StateProps {
  auth: Auth;
  error?: Error;
  isLoading: boolean;
}

interface DispatchProps {
  login: (values: State) => void;
}

interface OwnProps {
  test: string;
}

type Props = StateProps & DispatchProps & OwnProps;

export interface State {
  username: string;
  password: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = (): ReactElement => {
  const onFinish = (values: any): void => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const mapStateToProps = (state: AppState): StateProps => ({
  auth: state.loginState.auth,
  isLoading: state.loginState.isLoading,
  error: state.loginState.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, any>): any => ({
  login: async (data: State): Promise<any> => {
    await dispatch(login(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
