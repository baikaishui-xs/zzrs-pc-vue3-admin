import { Module } from 'vuex'

import {apiGetRoleList} from '@/api/apiRole'

export interface ILoginState {
  roleList: any
  isShowCreateRoleDialog: boolean
  isShowEditRoleDialog: boolean
  rowInfo: any
  defaultCheckedKeys: any
}

const storeModule: Module<ILoginState, any> = { // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
  namespaced: true,
  state() { // 公共数据
    return {
      roleList: [],
      rowInfo: {},
      isShowCreateRoleDialog: false,
      isShowEditRoleDialog: false,
      defaultCheckedKeys: []
    }
  },
  mutations: { // 修改 store 中的数据
    setRoleList(state, roleList: any) {
      state.roleList = roleList
    },
    setIsShowCreateRoleDialog(state, isShowCreateRoleDialog: boolean) {
      state.isShowCreateRoleDialog = isShowCreateRoleDialog
    },
    setIsShowEditRoleDialog(state, isShowEditRoleDialog: boolean) {
      state.isShowEditRoleDialog = isShowEditRoleDialog
    },
    setRowInfo(state, rowInfo) {
      state.rowInfo = rowInfo
    },
    setDefaultCheckedKeys(state, defaultCheckedKeys) {
      state.defaultCheckedKeys = defaultCheckedKeys
    }
  },
  actions: { // 处理异步任务
    async getRoleList(context) { // 用户登录[用户名]
      const {list}  = await apiGetRoleList()
      context.commit('setRoleList', list)
    }
  },
}

export default storeModule
