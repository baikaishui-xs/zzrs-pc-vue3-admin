import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/main',
    name: 'main',
    children: [
      {
        path: '/main/home',
        name: 'home',
        component: () => import('@/views/main/home/index.vue')
      }
    ],
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo/index.vue')
  },
  {
    path: "/:pathMatch(.*)",
    name: 'notFound',
    component: () => import('@/views/notFound/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
