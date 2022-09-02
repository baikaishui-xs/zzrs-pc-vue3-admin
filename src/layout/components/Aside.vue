<template>
  <div class="hd">
    <img class="img" src="@/assets/images/logo.png">
    <span class="text" v-if="!isExpandIcon">电商后台管理系统</span>
  </div>
  <div class="bd">
    <el-menu class="el-menu-vertical-demo" :collapse="isExpandIcon" active-text-color="#ffd04b" background-color="#AA292D" text-color="#fff" :default-active="storeDefaultActive" :collapse-transition="false">
      <el-menu-item index="0" @click="routerJump({id: '0', name: '首页'}, {url: '/main/home', id: '0', name: ''})">首页</el-menu-item>
      <template v-for="item in menuTree" :key="item.id">
        <el-sub-menu :index="item.id + ''" v-if="item.name !== '系统总览' && item.name !== '随便聊聊'">
          <template #title>
            <component :is="item.icon.substr(8)" style="width: 16px; height:16px; margin-left: 4px;" />
            <span v-if="!isExpandIcon" style="margin-left: 10px">{{item.name}}</span>
          </template>
          <template v-for="item1 in item.children" :key="item1.id">
            <el-menu-item v-if="item1.name !== '部门管理' && item1.name !== '商品类别'" :index="item1.id + ''" style="background-color: rgba(0, 0, 0, .3);" @click="routerJump(item, item1)">
              <span>{{item1.name}}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
import localCache from '@/utils/cache'
export default defineComponent({
  name: 'Aside',
  props: {
    isExpandIcon: {
      type: Boolean, // 类型
      default: true // 默认值
    }
  },
  setup() {
    const menuTree = store.state.user.roleMenuTree

    const router = useRouter()

    const routerJump = (item: any, item1: any) => {
      // 路由跳转
      router.push({
        path: item1.url ?? '/not-found'
      })

      localCache.setCache('defaultActive', item1.id + '')
      store.commit('layout/setBreadcrumb1', item.name)
      store.commit('layout/setBreadcrumb2', item1.name)
    }

    const storeDefaultActive = localCache.getCache('defaultActive') ?? '0' // 当前所在菜单

    return {
      menuTree,
      routerJump,
      storeDefaultActive
    }
  }
})
</script>
<style lang='scss' scoped>
.hd {
  display: flex;
  align-items: center;
  .img {
    width: 64px;
  }
  .text {
    margin-left: 3px;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
  }
}
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
