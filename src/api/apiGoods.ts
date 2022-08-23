import { request } from '@/utils/request'

import { IGetGoodsList } from './types/apiGoods'

export function apiGetGoodsList(data: IGetGoodsList) {
  return request.post({
    url: '/goods/list',
    data
  })
}
