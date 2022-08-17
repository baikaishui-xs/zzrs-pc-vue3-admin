import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index.vue')
  },
  {
    path: "/:pathMatch(.*)",
    component: () => import('@/views/notFound/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
