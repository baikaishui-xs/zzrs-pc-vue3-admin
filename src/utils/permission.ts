// 导航守卫

import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 前置守卫
router.beforeEach((to, from, next) => {
  nprogress.configure({showSpinner: false}) // 是否显示转轮
  nprogress.start() // 开启进度条
  next()
  nprogress.done() // 该方法放在前置守卫的最下面。解决手动切换地址时，进度条不关闭的问题
})

// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
