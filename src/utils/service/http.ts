import axios from 'axios'
import { message } from 'antd'

export interface NextProps {
  status?: number;
  message?: string;
}

/**
 * 跳转登录页
 */
const toLogin = () => {
  // TODO
}

const errorHandle = (error: NextProps) => {
  // 状态码判断
  switch (error.status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      message.error(error.message)
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      message.error(error.message)
      localStorage.removeItem('token')
      toLogin()
      break
    // 404请求不存在
    case 404:
      message.error(error.message)
      break
  }
}

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 60,
  headers: {
    'Content-Type': 'application/json'
  }
})

// TODO 取消请求（最终实现：1. 路由切换时取消请求；2. 重复点击按钮时取消请求；3. 组件卸载时取消请求）
// 请求拦截器
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    return config
  },
  error => Promise.reject(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    return Promise.resolve(res.data)
  },
  // 请求失败
  error => {
    // 处理异常
    // TODO 处理接口异常（方案：1. 直接dispatch到store中；2. 组装异常将异常返回给上层调用的action，dispatch到对应的组件；3.直接在此处弹出提示）
    // const { response } = error
    // const httpError: NextProps = {}
    // if (response) {
    //   httpError.status = response.status
    //   httpError.message = response.data.message
    // } else {
    //   // 处理断网的情况
    //   if (!window.navigator.onLine) {
    //     httpError.status = 423
    //     httpError.message = '网络异常！'
    //   } else {
    //     httpError.status = 423
    //     httpError.message = '请重试！'
    //   }
    // }
    // errorHandle(httpError)
    return Promise.reject(error)
  })

export default instance
