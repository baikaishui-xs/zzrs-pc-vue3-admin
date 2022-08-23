import { Module } from 'vuex'
import { apiGetMenuList } from '@/api/apiMenuManage'

export interface ILoginState {
  menuList: any
}

const storeModule: Module<ILoginState, any> = {
  namespaced: true,
  state() { // 公共数据
    return {
      menuList: [],
    }
  },
  mutations: { // 修改 store 中的数据
    setMenuList(state, menuList: any[]) {
      state.menuList = menuList
    }
  },
  actions: { // 处理异步任务
    async getMenuList({ commit }) {
      const { list } = await apiGetMenuList()
      commit('setMenuList', list)
    }
  },
}

export default storeModule
