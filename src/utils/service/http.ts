import axios, {
  AxiosInstance,
  Canceler,
  CancelTokenStatic,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

// 创建axios实例
const NextAxios: AxiosInstance = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求列表
const requestList: string[] = []
// 取消列表
const CancelToken: CancelTokenStatic = axios.CancelToken
const source: {
  [key: string]: Canceler;
} = {}
// 请求拦截器
NextAxios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 将请求的url和参数拼接成一个字符串，用来标识每一次请求
    const request = config.url + JSON.stringify(config.params) + JSON.stringify(config.data)
    config.cancelToken = new CancelToken((cancel: Canceler) => {
      source[request] = cancel
    })
    if (requestList.includes(request)) {
      source[request]('Cancel http request!')
    } else {
      requestList.push(request)
    }
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  (error: any) => Promise.reject(error))

// 响应拦截器
NextAxios.interceptors.response.use(
  // 请求成功
  (response: AxiosResponse) => {
    const request = response.config.url + JSON.stringify(response.config.data)
    requestList.splice(requestList.findIndex(item => item === request), 1)
    return Promise.resolve(response.data)
  },
  // 请求失败
  (error: any) => {
    // 如果是取消请求产生的错误
    if (axios.isCancel(error)) {
      console.error(error.message)
    } else if (error && error.response) {
      // 处理http异常
      // 401
      // 403
      // 404
      // 422
    } else {
      // 其他的异常
    }
    return Promise.reject(error)
  })

// 取消所有请求（在切换路由的时候）
export const cancelAllRequest = (): void => {
  Object.keys((key: string) => {
    source[key]('Cancel all http request!')
  })
}

export default NextAxios
