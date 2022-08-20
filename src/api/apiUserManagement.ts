import { request } from '@/utils/request'

export function apiGetUserList() { // 查询用户列表
  return request.post({
    url: '/users/list'
  })
}

export function apiDelUser(id: number) { // 删除用户
  return request.delete({
    url: `users/${id}`
  })
}

export function apiEditUser(id: number) { // 编辑用户
  return request.patch({
    url: `users/${id}`
  })
}
