import axios, {
  AxiosInstance,
  Canceler,
  CancelTokenStatic,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import configureStore from 'store/index';

// Create axios instance
const NextAxios: AxiosInstance = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store the current Active request
let requestList: string[] = [];
const CancelToken: CancelTokenStatic = axios.CancelToken;
// Stores cancel functions for all Active requests
const source: { [key: string]: Canceler } = {};

// request interceptors
NextAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // The request URL and parameters are spliced into a string to identify each request
    const request = config.url + JSON.stringify(config.params) + JSON.stringify(config.data);
    config.cancelToken = new CancelToken((cancel: Canceler) => {
      source[request] = cancel;
    });
    if (requestList.includes(request)) {
      source[request]('Cancel HTTP request!');
    } else {
      requestList.push(request);
    }

    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  (error: any) => Promise.reject(error)
);

// response interceptors
NextAxios.interceptors.response.use(
  // request success
  (response: AxiosResponse) => {
    const request = response.config.url + JSON.stringify(response.config.data);
    requestList.splice(
      requestList.findIndex((item) => item === request),
      1
    );
    return Promise.resolve(response.data);
  },
  // request error
  (error: any) => {
    requestList = [];
    if (error && error.response) {
      // Handle a field returned by the backend
      // 401
      // 403
      // 404
      // 422
      return Promise.reject(error.response.data);
    } else {
      // other error
      return Promise.reject(error);
    }
  }
);

// Cancel all requests
export const cancelAllRequests = (): void => {
  Object.keys((key: string) => {
    source[key]('Cancel all HTTP requests!');
  });
};

export default NextAxios;
