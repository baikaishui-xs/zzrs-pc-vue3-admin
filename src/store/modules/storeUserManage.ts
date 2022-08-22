import { Module } from 'vuex'
import { apiGetUserList } from '@/api/apiUserManagement'

export interface ILoginState {
  userList: any
  // PubSearchFormData: any
}

const storeModule: Module<ILoginState, any> = {
  namespaced: true,
  state() { // 公共数据
    return {
      userList: [],
      // PubSearchFormData: {
      //   id: '',
      //   name: '',
      //   password: '',
      // }
    }
  },
  mutations: { // 修改 store 中的数据
    setUserList(state, userList: any[]) {
      state.userList = userList
    }
  },
  actions: { // 处理异步任务
    async getUserList({ commit }, data) {
      const { list } = await apiGetUserList(data)
      commit('setUserList', list)
    }
  },
}

export default storeModule
