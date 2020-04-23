import { Reducer } from 'redux';
import { AdminUserActionTypes, AdminUserAction } from 'store/actions/adminUserAction';

export interface AdminUser {
  username: string;
  _id: string;
}

export interface AdminUserState {
  getAdminUsersLoading: boolean;
  adminUsers: AdminUser[];
  getAdminUsersError?: Error;
  getAdminUserDetailLoading: boolean;
  adminUser: AdminUser;
  getAdminUserDetailError?: Error;
}

const initAdminUserState: AdminUserState = {
  getAdminUsersLoading: false,
  adminUsers: [],
  getAdminUserDetailLoading: false,
  adminUser: {} as AdminUser,
};

export const adminUserReducer: Reducer<AdminUserState, AdminUserAction> = (
  state = initAdminUserState,
  action
) => {
  switch (action.type) {
    case AdminUserActionTypes.GET_ADMIN_USERS_LOADING:
      return {
        ...state,
        getAdminUsersLoading: true,
      };
    case AdminUserActionTypes.GET_ADMIN_USERS_SUCCESS:
      return {
        ...state,
        getAdminUsersLoading: false,
        adminUsers: action.adminUsers,
      };
    case AdminUserActionTypes.GET_ADMIN_USERS_ERROR:
      return {
        ...state,
        getAdminUsersLoading: false,
        getAdminUsersError: action.getAdminUsersError,
      };
    case AdminUserActionTypes.GET_ADMIN_USER_DETAIL_LOADING:
      return {
        ...state,
        getAdminUserDetailLoading: true,
      };
    case AdminUserActionTypes.GET_ADMIN_USER_DETAIL_SUCCESS:
      return {
        ...state,
        getAdminUserDetailLoading: false,
        adminUser: action.adminUser,
      };
    case AdminUserActionTypes.GET_ADMIN_USER_DETAIL_ERROR:
      return {
        ...state,
        getAdminUserDetailLoading: false,
        getAdminUserDetailError: action.getAdminUserDetailError,
      };
    default:
      return state;
  }
};
