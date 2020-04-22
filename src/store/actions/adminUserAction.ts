import { Dispatch } from 'redux';

import { AdminUser } from 'store/reducers/adminUserReducer';
import { adminUserService } from 'utils/service/api';

export enum AdminUserActionTypes {
  GET_ADMIN_USERS_LOADING = 'GET_ADMIN_USERS_LOADING',
  GET_ADMIN_USERS_SUCCESS = 'GET_ADMIN_USERS_SUCCESS',
  GET_ADMIN_USERS_ERROR = 'GET_ADMIN_USERS_ERROR',
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

export type AdminUserAction = GetAdminUsersLoading | GetAdminUsersSuccess | GetAdminUsersError;

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
