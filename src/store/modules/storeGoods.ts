import { Module } from 'vuex'
import { apiGetGoodsList } from '@/api/apiGoods'

export interface ILoginState {
  goodsList: any
  totalCount: number
}

const storeModule: Module<ILoginState, any> = { // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
  namespaced: true,
  state() { // 公共数据
    return {
      goodsList: [],
      totalCount: 0, // 总数据
      // size: 6 // 每页显示多少条数据
    }
  },
  mutations: { // 修改 store 中的数据
    setGoodsList(state, goodsList: any) {
      state.goodsList = goodsList
    },
    setTotalCount(state, totalCount: number) {
      state.totalCount = totalCount
    }
  },
  actions: { // 处理异步任务
    async getGoodsList({ commit }, data) {
      const { list, totalCount } = await apiGetGoodsList(data)
      commit('setGoodsList', list)
      commit('setTotalCount', totalCount)
    }
  },
}

export default storeModule
