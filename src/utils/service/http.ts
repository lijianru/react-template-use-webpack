import axios from 'axios'

/**
 * 提示函数
 */
const tip = (msg: string): void => {
  console.log(msg)
}

/**
 * 跳转登录页
 */
const toLogin = () => {
  // TODO
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} other 错误消息
 */
const errorHandle = (status: number, other: string) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录')
      localStorage.removeItem('token')
      toLogin()
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
const instance = axios.create({ timeout: 1000 * 60 })

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// TODO 取消请求（最终实现：1. 路由切换时取消请求；2. 重复点击按钮时取消请求；3. 组件卸载时取消请求）
// TODO 请求跨域
// TODO 处理接口异常（方案：1. 直接dispatch到store中；2. 组装异常将异常返回给上层调用的action，dispatch到对应的组件；3.直接在此处弹出提示）
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // TODO 在发出请求前对请求头进行处理，添加token，设置Content-Type，根据Content-Type转换传入参数或Body的格式等等
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
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      if (!window.navigator.onLine) {
        console.log('断网啦！')
      } else {
        return Promise.reject(error)
      }
    }
  })

export default instance
