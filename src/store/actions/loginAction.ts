import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { loginService } from 'utils/service/api';
import { Auth, LoginState } from '../reducers/loginReducer';

export enum LoginActionTypes {
  LOGIN_LOADING = 'LOGIN_LOADING',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',
}

export interface LoginLoadingAction {
  type: LoginActionTypes.LOGIN_LOADING;
  isLoading: boolean;
}

export interface LoginSuccessAction {
  type: LoginActionTypes.LOGIN_SUCCESS;
  auth: Auth;
}

export interface LogoutSuccessAction {
  type: LoginActionTypes.LOGOUT_SUCCESS;
}

export interface LoginErrorAction {
  type: LoginActionTypes.LOGIN_ERROR;
  error: Error;
}

export type LoginAction =
  | LoginLoadingAction
  | LoginSuccessAction
  | LogoutSuccessAction
  | LoginErrorAction;

const loginLoading = (isLoading: boolean): LoginLoadingAction => ({
  isLoading,
  type: LoginActionTypes.LOGIN_LOADING,
});

const loginSuccess = (auth: Auth): LoginSuccessAction => ({
  auth,
  type: LoginActionTypes.LOGIN_SUCCESS,
});

const logoutSuccess = (): LogoutSuccessAction => ({
  type: LoginActionTypes.LOGOUT_SUCCESS,
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
        // TODO 不应该在action中
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

export const logout = () => {
  return (dispatch: Dispatch): void => {
    // TODO 不应该在action中
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
  };
};
