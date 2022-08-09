import Axios from 'axios'
import { ElLoading } from 'element-plus'

import type { AxiosInstance } from 'axios'
import type { ClAxiosConfig, HYRequestConfig } from './types/request'

class ClAxios {
  axios: AxiosInstance
  constructor(config: ClAxiosConfig) {
    this.axios = Axios.create(config)
    this.axios.interceptors.request.use( // 请求拦截器（公共）
      (request) => {
        return request
      },
      (err) => {
        return err
      }
    )
    this.axios.interceptors.response.use( // 响应拦截器（公共）
      (response) => {
        if (response.data.returnCode === '-1001') console.log('请求失败')
        return response.data
      },
      (err) => {
        if (err.response.status === 404) console.log('404 的错误')
        return err
      }
    )
  }
  requestConfig<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      let loading: any = null

      this.axios.interceptors.request.use( // 请求拦截器（私有）
        (request) => {
          if (config.showLoading) {
            loading = ElLoading.service({ // 开启 Loading 动画
              text: '正在加载中',
            })
          }
          return request
        },
        (err) => {
          return err
        }
      )

      this.axios.interceptors.response.use( // 响应拦截器（私有）
        (response) => {
          if (config.showLoading) loading.close() // 关闭 Loading 动画
          if (response.data.returnCode === '-1001') console.log('请求失败')
          return response.data
        },
        (err) => {
          if (config.showLoading) loading.close() // 关闭 Loading 动画
          if (err.response.status === 404) console.log('404 的错误')
          return err
        }
      )

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
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'get' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'post' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'delete' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.requestConfig<T>({ ...config, method: 'patch' })
  }
}

export const request = new ClAxios({
  baseURL: 'http://152.136.185.210:5000'
})

export const request1 = new ClAxios({
  baseURL: 'http://123.207.32.32:8000/'
})
