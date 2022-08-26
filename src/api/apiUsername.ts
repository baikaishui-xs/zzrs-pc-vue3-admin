import { request } from '@/utils/request'

import type { IUserLogin } from './types/apiUsername'

export function apiUserLogin(data: IUserLogin) { // 用户登录
  return request.post({
    url: '/login',
    data,
    isShowLoading: true
  })
}

export function apiGetUserInfo(id: number) { // 查询某个用户
  return request.get({
    url: `/users/${id}`
  })
}

export function apiGetRoleMenuTree(roleID: number) { // 查询角色菜单树
  return request.get({
    url: `/role/${roleID}/menu`
  })
}
