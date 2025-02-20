// 进行 axios 二次封装: 使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

// 创建 axios 实例
let request = axios.create({
  // 基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000, // 超时时间 5s
})

// 请求拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  // 返回配置对象
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 响应成功回调
    return response.data
  },
  (error) => {
    // 处理错误
    let message = ''
    let status = error.response.status
    switch (status) {
      case 401:
        message = 'Token 过期'
        break
      case 403:
        message = '无权限'
        break
      case 404:
        message = '地址错误'
        break
      case 500:
        message = '服务器错误'
        break
      default:
        message = '网络出错'
        break
    }
    ElMessage({
      type: 'error',
      message,
    })

    return Promise.reject(error)
  },
)

export default request
