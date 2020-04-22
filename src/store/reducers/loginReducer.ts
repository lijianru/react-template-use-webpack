import { Reducer } from 'redux';
import { LoginActionTypes, LoginAction } from '../actions/loginAction';

export interface Auth {
  token: string;
  username: string;
}

export interface LoginState {
  readonly isLoading: boolean;
  readonly auth: Auth;
  readonly error?: Error;
}

const initialLoginState: LoginState = {
  isLoading: false,
  auth: {} as Auth,
};

export const loginReducer: Reducer<LoginState, LoginAction> = (
  state = initialLoginState,
  action
) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        error: undefined,
      };
    case LoginActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.auth,
      };
    case LoginActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialLoginState,
      };
    case LoginActionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
