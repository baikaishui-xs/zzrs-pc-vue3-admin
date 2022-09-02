import { request } from '@/utils/request'
import type {
  IGetUserList,
  IApiCreateUser,
  IApiEditUser
} from './types/apiUserManage'

// 查询用户列表
export function apiGetUserList(data: IGetUserList) {
  return request.post({
    url: '/users/list',
    data
  })
}

// 创建用户
export function apiCreateUser(data: IApiCreateUser) {
  return request.post({
    url: '/users',
    data
  })
}

// 删除用户
export function apiDelUser(id: number) {
  return request.delete({
    url: `users/${id}`
  })
}

// 编辑用户
export function apiEditUser(id: number, data: IApiEditUser) {
  return request.patch({
    url: `users/${id}`,
    data
  })
}

// 获取 部门列表
export function apiGetDepartmentList() {
  return request.post({
    url: '/department/list'
  })
}

// 获取 部门列表
export function apiGetRoleList() {
  return request.post({
    url: '/role/list'
  })
}
