import { Dispatch } from 'redux';

import { AdminUser } from 'store/reducers/adminUserReducer';
import { adminUserService } from 'utils/service/api';

export enum AdminUserActionTypes {
  GET_ADMIN_USERS_LOADING = 'GET_ADMIN_USERS_LOADING',
  GET_ADMIN_USERS_SUCCESS = 'GET_ADMIN_USERS_SUCCESS',
  GET_ADMIN_USERS_ERROR = 'GET_ADMIN_USERS_ERROR',
  GET_ADMIN_USER_DETAIL_LOADING = 'GET_ADMIN_USER_DETAIL_LOADING',
  GET_ADMIN_USER_DETAIL_SUCCESS = 'GET_ADMIN_USER_DETAIL_SUCCESS',
  GET_ADMIN_USER_DETAIL_ERROR = 'GET_ADMIN_USER_DETAIL_ERROR',
}

export interface GetAdminUsersLoading {
  type: AdminUserActionTypes.GET_ADMIN_USERS_LOADING;
  getAdminUsersLoading: boolean;
}

export interface GetAdminUsersSuccess {
  type: AdminUserActionTypes.GET_ADMIN_USERS_SUCCESS;
  adminUsers: AdminUser[];
}

export interface GetAdminUsersError {
  type: AdminUserActionTypes.GET_ADMIN_USERS_ERROR;
  getAdminUsersError: Error;
}

export interface GetAdminUserDetailLoading {
  type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_LOADING;
  getAdminUserDetailLoading: boolean;
}

export interface GetAdminUserDetailSuccess {
  type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_SUCCESS;
  adminUser: AdminUser;
}

export interface GetAdminUserDetailError {
  type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_ERROR;
  getAdminUserDetailError: Error;
}

export type AdminUserAction =
  | GetAdminUsersLoading
  | GetAdminUsersSuccess
  | GetAdminUsersError
  | GetAdminUserDetailLoading
  | GetAdminUserDetailSuccess
  | GetAdminUserDetailError;

const adminUserActionCreators = {
  getAdminUsersLoading: (getAdminUsersLoading: boolean): GetAdminUsersLoading => ({
    getAdminUsersLoading,
    type: AdminUserActionTypes.GET_ADMIN_USERS_LOADING,
  }),
  getAdminUsersSuccess: (adminUsers: AdminUser[]): GetAdminUsersSuccess => ({
    adminUsers,
    type: AdminUserActionTypes.GET_ADMIN_USERS_SUCCESS,
  }),
  getAdminUsersError: (getAdminUsersError: Error): GetAdminUsersError => ({
    getAdminUsersError,
    type: AdminUserActionTypes.GET_ADMIN_USERS_ERROR,
  }),
  getAdminUserDetailLoading: (getAdminUserDetailLoading: boolean): GetAdminUserDetailLoading => ({
    getAdminUserDetailLoading,
    type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_LOADING,
  }),
  getAdminUserDetailSuccess: (adminUser: AdminUser): GetAdminUserDetailSuccess => ({
    adminUser,
    type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_SUCCESS,
  }),
  getAdminUserDetailError: (getAdminUserDetailError: Error): GetAdminUserDetailError => ({
    getAdminUserDetailError,
    type: AdminUserActionTypes.GET_ADMIN_USER_DETAIL_ERROR,
  }),
};

export const getAdminUsers = () => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(adminUserActionCreators.getAdminUsersLoading(true));
    try {
      const adminUsers = await adminUserService.fetchAdminUsers();
      dispatch(adminUserActionCreators.getAdminUsersSuccess(adminUsers));
    } catch (error) {
      dispatch(adminUserActionCreators.getAdminUsersError(error));
    }
  };
};

export const getAdminUserById = (id: string) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(adminUserActionCreators.getAdminUserDetailLoading(true));
    try {
      const adminUser = await adminUserService.fetchAdminUserById(id);
      dispatch(adminUserActionCreators.getAdminUserDetailSuccess(adminUser));
    } catch (error) {
      dispatch(adminUserActionCreators.getAdminUserDetailError(error));
    }
  };
};
