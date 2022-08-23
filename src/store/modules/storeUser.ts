import { Module } from 'vuex'
import { userLogin, getUserInfo, getRoleMenuTree } from '@/api/apiUsername'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/mapMenus'
  import router from '@/router'
import store from '@/store'

interface ILoginState {
  token: string,
  userInfo: any,
  roleMenuTree: any,
  permissions: string[]
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
      userInfo: {}, // 用户信息
      roleMenuTree: {}, // 角色菜单树
      permissions: [] // 用户所拥有的操作权限
    }
  },
  mutations: { // 修改 store 中的数据
    setToken(state, token: string) {
      state.token = token
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
    async userLogin({ commit }, data: demo) { // 用户登录
      console.log(1)
      const {token, id} = await userLogin(data)
      commit('setToken', token)
      const userInfo = await getUserInfo(id)
      const roleMenuTree = await getRoleMenuTree(userInfo.role.id)
      commit('setUserInfo', userInfo)
      commit('setRoleMenuTree', roleMenuTree)
      localCache.setCache('token', token)
      localCache.setCache('userInfo', userInfo)
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
