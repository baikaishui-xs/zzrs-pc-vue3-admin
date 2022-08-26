import { Module } from 'vuex'
import { apiGetUserList } from '@/api/apiUserManage'

export interface ILoginState {
  userList: any
  userInfo: any
  isShowCreateUserDialog: boolean
  isShowEditUserDialog: boolean
}

const storeModule: Module<ILoginState, any> = {
  namespaced: true,
  state() { // 公共数据
    return {
      userList: [],
      userInfo: {
        name: '',
        realname: '',
        cellphone: '',
        departmentId: '',
        roleId: ''
      },
      isShowCreateUserDialog: false,
      isShowEditUserDialog: false
    }
  },
  mutations: { // 修改 store 中的数据
    setUserList(state, userList: any[]) {
      state.userList = userList
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setIsShowCreateUserDialog(state, isShowCreateUserDialog: boolean) {
      state.isShowCreateUserDialog = isShowCreateUserDialog
    },
    setIsShowEditUserDialog(state, isShowEditUserDialog: boolean) {
      state.isShowEditUserDialog = isShowEditUserDialog
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
