import { Module } from 'vuex'

export interface ILoginState {
  token: string
}

const storeModule: Module<ILoginState, any> = { // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
  namespaced: true,
  state() { // 公共数据
    return {
      token: '111', // token
    }
  },
  mutations: { // 修改 store 中的数据
    setToken(state, token: string) {
      state.token = token
    }
  },
  actions: { // 处理异步任务
    async getDemo({dispatch, state}) { // 用户登录[用户名]
      console.log(1)
      dispatch("getDemo1")
      console.log(state.token)
    },
    async getDemo1() {
      console.log(2)
    }
  },
}

export default storeModule
