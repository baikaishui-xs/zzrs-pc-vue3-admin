import { Module } from 'vuex'
import { apiUserLogin, apiGetUserInfo, apiGetRoleMenuTree } from '@/api/apiUsername'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'
  import router from '@/router'
import store from '@/store'

interface ILoginState {
  token: string,
  userInfo: any,
  roleMenuTree: any,
  permissions: string[],
  userID: any
}
interface demo {
  name: string
  password: string
}

const storeModule: Module<ILoginState, any> = { // 第一个泛型为当前模块的 state 配置项类型 // 第二个泛型为根组件的 state 配置项类型，因为我一般不在根组件使用 state 配置项，所以这里就填 any
  namespaced: true,
  state() { // 公共数据
    return {
      token: '', // token
      userID: '',
      userInfo: {}, // 用户信息
      roleMenuTree: {}, // 角色菜单树
      permissions: [] // 用户所拥有的操作权限
    }
  },
  mutations: { // 修改 store 中的数据
    setToken(state, token: string) {
      state.token = token
    },
    setUserID(state, userID: any) {
      state.userID = userID
    },
    setUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    setRoleMenuTree(state, roleMenuTree: any) {
      state.roleMenuTree = roleMenuTree

      const routes = mapMenusToRoutes(roleMenuTree) // 用户所拥有的动态路由

      routes.forEach((route) => {
        router.addRoute('main', route) // 将用户所拥有的动态路由添加到路由中
      })

      const permissions = mapMenusToPermissions(roleMenuTree) // 获取 用户所拥有的操作权限
      state.permissions = permissions
    },
    quitLogin(state) { // 退出登录
      state.token = ''
      state.userInfo = ''
      state.roleMenuTree = ''
      state.permissions = []
      localCache.deleteCache('token')
      localCache.deleteCache('userInfo')
      localCache.deleteCache('roleMenuTree')
      localCache.deleteCache('defaultActive')
      localCache.deleteCache('breadcrumb1')
      localCache.deleteCache('breadcrumb2')
      store.commit('layout/setBreadcrumb1', undefined)
      store.commit('layout/setBreadcrumb2', undefined)
    },
  },
  actions: { // 处理异步任务
    async userLogin({ dispatch, state }, data: demo) { // 用户登录
      await dispatch('login', data)
      await dispatch('getUserInfo', state.userID)
      await dispatch('getRoleMenuTree', state.userInfo.role.id)
    },
    async login({commit}, data) {
      const {token, id} = await apiUserLogin(data)
      commit('setToken', token)
      commit('setUserID', id)
      localCache.setCache('token', token)
    },
    async getUserInfo({ commit }, id) {
      const userInfo = await apiGetUserInfo(id)
      commit('setUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
    },
    async getRoleMenuTree({ commit }, roleID) {
      const roleMenuTree = await apiGetRoleMenuTree(roleID)
      commit('setRoleMenuTree', roleMenuTree)
      localCache.setCache('roleMenuTree', roleMenuTree)
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('setToken', token)
      }
    },
    loadLocalUserInfo({ commit }) {
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('setUserInfo', userInfo)
      }
    },
    loadLocalRoleMenuTree({ commit }) {
      const roleMenuTree = localCache.getCache('roleMenuTree')
      if (roleMenuTree) {
        commit('setRoleMenuTree', roleMenuTree)
      }
    },
  },
}

export default storeModule
