import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { ThunkDispatch } from 'redux-thunk'

import { Auth } from '../../redux/reducers/loginReducer'
import { AppState } from '../../redux/store'
import { login } from '../../redux/actions/loginAction'

import styles from './styles.scss'

interface StateProps {
  auth: Auth;
  error?: Error;
  isLoading: boolean;
}

interface DispatchProps {
  login: (values: State) => void;
}

interface OwnProps extends FormComponentProps {
  test: string;
}

type Props = StateProps & DispatchProps & OwnProps

export interface State {
  username: string;
  password: string;
}

class LoginForm extends React.Component<Props> {
  handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values)
      }
    })
  }

  render(): React.ReactElement {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" className={styles.inputPlaceholder} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" className={styles.inputPlaceholder} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm)

const mapStateToProps = (state: AppState): StateProps => ({
  auth: state.loginState.auth,
  isLoading: state.loginState.isLoading,
  error: state.loginState.error,
})

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, undefined, any>) => ({
  login: async (data: State): Promise<any> => {
    await dispatch(login(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)
