const user = () => import('@/views/main/system/userManage/index.vue')
export default {
  path: '/main/system/user',
  name: 'userManage',
  component: user,
  children: []
}
