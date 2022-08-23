import store from '@/store'

export function usePermission(pageName: string, hanldeName: string) { // 判断路由中是否拥有某个操作权限 // （参数一：路由名称）（参数二：操作权限）
  const permissions = store.state.user.permissions // 获取用户拥有的操作权限
  const verifyPermission = `system:${pageName}:${hanldeName}`
  return !!permissions.find((item: any) => item === verifyPermission)
}
