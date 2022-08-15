<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isExpandIcon" active-text-color="#ffd04b" background-color="#AA292D" text-color="#fff" default-active="2" :collapse-transition="false">
    <el-menu-item index="1">首页</el-menu-item>
    <el-sub-menu :index="item.id" v-for="item in menuTree" :key="item.id">
      <template #title>
        <component :is="item.icon" style="width: 16px; height:16px; margin-left: 4px;" />
        <span v-if="!isExpandIcon" style="margin-left: 10px">{{item.name}}</span>
      </template>
      <el-menu-item v-for="item1 in item.children" :key="item1.id" :index="item1.id" style="background-color: rgba(0, 0, 0, .3);">
        <component :is="item1.icon" style="width: 16px; height:16px; margin-right: 6px" />
        <span>{{item1.name}}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: '',
  setup() {
    const menuTree: any = [
      {
        id: '2',
        name: '系统总览',
        icon: 'monitor',
        children: [
          {
            id: '2-1',
            name: '核心技术',
            icon: 'monitor',
            children: null
          }
        ]
      },
      {
        id: '3',
        name: '系统管理',
        icon: 'monitor',
        children: [
          {
            id: '3-1',
            name: '用户管理',
            icon: 'monitor',
            children: null
          },
          {
            id: '3-2',
            icon: 'monitor',
            name: '部门管理',
            children: null
          }
        ]
      }
    ]

    return {
      menuTree
    }
  }
})
</script>
<style lang='scss' scoped>
.el-menu {
  border-right: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
