import type { AxiosRequestConfig } from 'axios'

export interface HYRequestConfig extends AxiosRequestConfig {
  isShowLoading?: boolean
  method?: string
}
