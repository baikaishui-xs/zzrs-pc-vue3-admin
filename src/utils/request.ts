import Axios from 'axios'
import { ElLoading } from 'element-plus'

import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { HYRequestConfig } from './types/request'

import store from '@/store'

class ClAxios {
  axios: AxiosInstance
  loading: any
  isShowLoading: boolean
  constructor(config: AxiosRequestConfig) {
    this.axios = Axios.create(config)
    this.loading = null // 加载动画实例
    this.isShowLoading = false // 是否 开启加载动画
    this.axios.interceptors.request.use( // 请求拦截器
      (request) => {
        const token = store.state.user.token
        if (token) request.headers!.Authorization = `Bearer ${token}` // 这里需要把 headers 的类型改成 any
        if (this.isShowLoading) {
          this.loading = ElLoading.service({ // 开启 Loading 动画
            text: '正在加载中',
          })
        }
        return request
      },
      (err) => {
        return err
      }
    )
    this.axios.interceptors.response.use( // 响应拦截器
      (response) => {
        if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
        return response.data.data
      },
      (err) => {
        if (this.isShowLoading) this.loading.close() // 关闭 Loading 动画
        return Promise.reject(err) // 这里要手动抛出错误，否则代码还是会继续往下执行
      }
    )
  }
  requestConfig<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.isShowLoading) {
        this.isShowLoading = true
      }
      this.axios
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'get' })
  }
  post<T = any>(config: HYRequestConfig): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'post' })
  }
  delete<T = any>(config: HYRequestConfig): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'delete' })
  }
  patch<T = any>(config: HYRequestConfig): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'patch' })
  }
}

export const request = new ClAxios({
  baseURL: 'http://152.136.185.210:5000'
})

export const request1 = new ClAxios({
  baseURL: 'http://123.207.32.32:8000/'
})
