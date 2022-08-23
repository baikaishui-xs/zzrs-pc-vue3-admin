import { request } from '@/utils/request'

export function apiGetMenuList() { // 查询菜单列表
  return request.post({
    url: '/menu/list',
  })
}
