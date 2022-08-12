import { request } from '@/utils/request'

import type { IUserLogin } from './types/username'

export function userLogin(data: IUserLogin) { // 用户登录
  return request.post({
    url: '/login',
    data
  })
}

export function getUserInfo(id: number) { // 查询某个用户
  return request.get({
    url: `/users/${id}`
  })
}
