import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosStatic, Axios } from 'axios'
import { useStore } from '@/store'
import { tokenTimeOut } from '@/utils/auth'

class MyAxios {
  constructor(axios: AxiosStatic, config: AxiosRequestConfig) {
    this.axios = axios.create(config)
  }
  axios: AxiosInstance
  request<T = any, R = T, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.axios.request<T, R, D>(config)
  }
  getWithArray<T = any, R = BaseResponseArray<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request<T, R, D>(config)
  }
  getWithData<T = any, R = BaseResponseData<T>, D = any>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.request<T, R, D>(config)
  }
}

const service = new MyAxios(axios, {
  baseURL: 'http://127.0.0.1:7788/',
  timeout: 30000
})

// 请求拦截器
service.axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const { User } = useStore()
    if (User.token) {
      if (tokenTimeOut()) {
        User.loginOut()
        window.$message.error('token过期')
        return Promise.reject(new Error('token过期'))
      }
      config.headers.Authorization = `${User.token}` //Bearer
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response
    if (status == 200 || status == 201) {
      return Promise.resolve(data)
    }
    window.$message.error(data.message)
    return Promise.reject(new Error(data.message))
  },
  (error: any) => {
    window.$message.error(error.message)
    return Promise.reject(error)
  }
)
export default service
