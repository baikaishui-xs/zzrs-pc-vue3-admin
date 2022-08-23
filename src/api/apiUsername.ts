import { request } from '@/utils/request'

import type { IUserLogin } from './types/apiUsername'

export function userLogin(data: IUserLogin) { // 用户登录
  return request.post({
    url: '/login',
    data,
    isShowLoading: true
  })
}

export function getUserInfo(id: number) { // 查询某个用户
  return request.get({
    url: `/users/${id}`
  })
}

export function getRoleMenuTree(roleID: number) { // 查询角色菜单树
  return request.get({
    url: `/role/${roleID}/menu`
  })
}
