import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading } from 'element-plus'

interface ClAxiosConfig extends AxiosRequestConfig {
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestInterceptorCatch: (error: any) => any
    responseInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
    responseInterceptorCatch: (error: any) => any
  }
}

class ClAxios {
  axios: AxiosInstance
  loading: any // Element-plus 版本和老师的不一样，不知道什么类型，暂时用 any
  constructor(config: ClAxiosConfig) {
    this.axios = Axios.create(config)
    this.axios.interceptors.request.use( // 请求拦截器（公共）
      (request) => {
        this.loading = ElLoading.service({ // 开启 Loading 动画
          text: '正在加载中',
        })
        return request
      },
      (err) => {
        return err
      }
    )
    this.axios.interceptors.response.use( // 响应拦截器（公共）
      (response) => {
        setTimeout(() => {
          this.loading.close() // 关闭 Loading 动画
        }, 1000)
        if (response.data.returnCode === '-1001') console.log('请求失败')
        return response.data
      },
      (err) => {
        setTimeout(() => {
          this.loading.close() // 关闭 Loading 动画
        }, 1000)
        if (err.response.status === 404) console.log('404 的错误')
        return err
      }
    )
    this.axios.interceptors.request.use( // 请求拦截器（私有）
      config.interceptors.requestInterceptor,
      config.interceptors.requestInterceptorCatch
    )
    this.axios.interceptors.response.use( // 响应拦截器（私有）
      config.interceptors.responseInterceptor,
      config.interceptors.responseInterceptorCatch
    )
  }
}

export const request = new ClAxios({
  baseURL: 'https://api.it120.cc/zcr',
  interceptors: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
