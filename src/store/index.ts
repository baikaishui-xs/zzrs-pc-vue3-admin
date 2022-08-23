import { createStore } from 'vuex'

import demo from './modules/storeDemo'
import user from './modules/storeUser'
import layout from './modules/storeLayout'
import userManage from './modules/storeUserManage'
import goods from './modules/storeGoods'

const store = createStore({
  modules: { // 注册模块
    demo,
    user,
    layout,
    userManage,
    goods
  },
})

export function setupStore() { // 存储读取本地缓存的方法，用于统一导出
  store.dispatch('user/loadLocalLogin')
  store.dispatch('user/loadLocalUserInfo')
  store.dispatch('user/loadLocalRoleMenuTree')
  store.dispatch('layout/loadLocalBreadcrumb1')
  store.dispatch('layout/loadLocalBreadcrumb2')
}

export default store
