import instance from './http';
import BaseUrl from './base';

import { LoginProps } from 'pages/Login';

export const exampleService = (): Promise<any> => instance.get(`${BaseUrl.example}/api/v1/topics`);

export const loginService = (data: LoginProps): Promise<any> =>
  instance.post(`${BaseUrl.lolAdmin}/api/login`, data);

export const adminUserService = {
  fetchAdminUsers: (): Promise<any> => instance.get(`${BaseUrl.lolAdmin}/api/rest/adminUser`),
};
