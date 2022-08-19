import { Module } from 'vuex'
import localCache from '@/utils/cache'

export interface ILayoutState {
  breadcrumb1: string // 一级 面包屑导航
  breadcrumb2: string // 二级 面包屑导航
}

const storeModule: Module<ILayoutState, any> = { // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
  namespaced: true,
  state() { // 公共数据
    return {
      breadcrumb1: '',
      breadcrumb2: '',
    }
  },
  mutations: { // 修改 store 中的数据
    setBreadcrumb1(state, breadcrumb1: string) {
      state.breadcrumb1 = breadcrumb1
      localCache.setCache('breadcrumb1', breadcrumb1)
    },
    setBreadcrumb2(state, breadcrumb2: string) {
      state.breadcrumb2 = breadcrumb2
      localCache.setCache('breadcrumb2', breadcrumb2)
    }
  },
  actions: { // 处理异步任务
    loadLocalBreadcrumb1({ commit }) {
      const Breadcrumb1 = localCache.getCache('breadcrumb1')
      if (Breadcrumb1) {
        commit('setBreadcrumb1', Breadcrumb1)
      }
    },
    loadLocalBreadcrumb2({ commit }) {
      const Breadcrumb2 = localCache.getCache('breadcrumb2')
      if (Breadcrumb2) {
        commit('setBreadcrumb2', Breadcrumb2)
      }
    },
  },
}

export default storeModule
