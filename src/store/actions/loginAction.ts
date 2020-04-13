import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loginService } from 'utils/service/api';
import { Auth, LoginState } from '../reducers/loginReducer';

export enum LoginActionTypes {
  LOGIN_LOADING = 'login loading',
  LOGIN_SUCCESS = 'login success',
  LOGIN_ERROR = 'login error',
}

export interface LoginLoadingAction {
  type: LoginActionTypes.LOGIN_LOADING;
  isLoading: boolean;
}

export interface LoginSuccessAction {
  type: LoginActionTypes.LOGIN_SUCCESS;
  auth: Auth;
}

export interface LoginErrorAction {
  type: LoginActionTypes.LOGIN_ERROR;
  error: Error;
}

export type LoginAction = LoginLoadingAction | LoginSuccessAction | LoginErrorAction;

const loginLoading = (isLoading: boolean): LoginLoadingAction => ({
  isLoading,
  type: LoginActionTypes.LOGIN_LOADING,
});

const loginSuccess = (auth: Auth): LoginSuccessAction => ({
  auth,
  type: LoginActionTypes.LOGIN_SUCCESS,
});

const loginError = (error: Error): LoginErrorAction => ({
  error,
  type: LoginActionTypes.LOGIN_ERROR,
});

export const login: ActionCreator<ThunkAction<
  Promise<void>,
  LoginState,
  null,
  LoginSuccessAction
>> = (data: any) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(loginLoading(true));
    try {
      const response = await loginService(data);
      if (response && response.token) {
        window.alert('登录成功！');
        localStorage.setItem('token', response.token);
        dispatch(loginSuccess(response));
      } else {
        dispatch(loginError(new Error('接口异常！')));
      }
    } catch (err) {
      console.log(err);
      dispatch(loginError(err));
    }
  };
};
