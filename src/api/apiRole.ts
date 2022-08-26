import { request } from '@/utils/request'

export function apiGetRoleList() { // 获取 角色列表
  return request.post({
    url: '/role/list'
  })
}

export function apiNewRole(data: any) { // 新建 角色
  return request.post({
    url: '/role',
    data
  })
}

export function apiEditRole(id: number, data: any) { // 编辑 角色
  return request.patch({
    url: `/role/${id}`,
    data
  })
}

export function apiDelRole(id: number) { // 删除 角色
  return request.delete({
    url: `/role/${id}`
  })
}
