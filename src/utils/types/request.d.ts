import type { AxiosRequestConfig } from 'axios'

export interface ClAxiosConfig extends AxiosRequestConfig {
  showLoading?: boolean
}

export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  url: string
  showLoading?: boolean
}
