import { RouteRecordRaw } from 'vue-router'

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] { // 筛选出用户所拥有的路由
  const routes: RouteRecordRaw[] = [] // 用户所拥有的动态路由

  const allRoutes: RouteRecordRaw[] = [] // 动态路由

  /* require.context()：webpack 中的方法。用于获取加载文件的信息
  解决：有一千个路由，就要导入一千个路由导致代码冗余的问题
  参数：
    1、加载的文件路径
    2、是否加载后代文件。如：（true：/router/main/.../...）（false：/router/main）
    3、正则
  */
  const routeFiles = require.context('../router/modules', true, /\.ts/) // 导入 ../router/main 路径下以 ts 结尾的文件

  /* routeFiles.keys()：返回所有文件的路径。字符串数组格式的
  例：['./analysis/dashboard/index.ts', ...]
  */
  routeFiles.keys().forEach((key) => { // 将所有的动态路由放到一个数组中
    const route = require('../router/modules' + key.split('.')[1]) // route.default：{ path: '/main/analysis/dashboard', name: 'dashboard', children: Array(0), component }
    allRoutes.push(route.default)
  })

  const _recurseGetRoute = (menus: any[]) => { // 通过判断 用户所拥有的路由路径 和 动态路由的路径 是否相等，来筛选出当前用户所拥有的动态路由
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url) // allRoutes：[{ path: '/main/analysis/dashboard', name: 'dashboard', children: Array(0), component }, ...]
        if (route) routes.push(route)
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)

  return routes
}
