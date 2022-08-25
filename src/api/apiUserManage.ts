import { request } from '@/utils/request'
import {  IGetUserList} from './types/apiUserManage'

export function apiGetUserList(data: IGetUserList) { // 查询用户列表
  return request.post({
    url: '/users/list',
    data
  })
}

export function apiCreateUser(data: any) { // 创建用户
  return request.post({
    url: '/users',
    data
  })
}

export function apiDelUser(id: number) { // 删除用户
  return request.delete({
    url: `users/${id}`
  })
}

export function apiEditUser(id: number, data: any) { // 编辑用户
  return request.patch({
    url: `users/${id}`,
    data
  })
}

export function apiGetDepartmentList() { // 获取 部门列表
  return request.post({
    url: '/department/list'
  })
}

export function apiGetRoleList() { // 获取 部门列表
  return request.post({
    url: '/role/list'
  })
}
