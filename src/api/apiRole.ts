import { request } from '@/utils/request'
import type { IApiNewRole, IApiEditRole } from './types/apiRole'

// 获取 角色列表
export function apiGetRoleList() {
  return request.post({
    url: '/role/list'
  })
}

// 新建 角色
export function apiNewRole(data: IApiNewRole) {
  return request.post({
    url: '/role',
    data
  })
}
// 编辑 角色
export function apiEditRole(id: number, data: IApiEditRole) {
  return request.patch({
    url: `/role/${id}`,
    data
  })
}

// 删除 角色
export function apiDelRole(id: number) {
  return request.delete({
    url: `/role/${id}`
  })
}
