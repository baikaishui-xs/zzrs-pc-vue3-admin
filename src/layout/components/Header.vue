<template>
  <div class="left-box">
    <component :is="isExpandIcon ? 'Expand' : 'Fold'" class="icon" @click="foldIcon" />
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{breadcrumb1 ?? '首页'}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{breadcrumb2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="right-box">
    <el-dropdown>
      <div class="el-dropdown-link">
        <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span class="text">{{username}}</span>
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="quitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import store from '@/store'
export default defineComponent({
  name: 'Header',
  emits: ['changeIsExpandIcon'],
  setup(props, { emit }) {
    const router = useRouter()
    let isExpandIcon = ref(false)

    const username = store.state.user.userInfo.name // 用户名

    const breadcrumb1 = computed(() => store.state.layout.breadcrumb1) // 一级 面包屑导航
    const breadcrumb2 = computed(() => store.state.layout.breadcrumb2) // 二级 面包屑导航

    const foldIcon = () => {
      isExpandIcon.value = !isExpandIcon.value
      emit('changeIsExpandIcon', isExpandIcon.value)
    }

    const quitLogin = () => {
      store.commit('user/quitLogin')
      router.push('/login')
    }

    return {
      isExpandIcon,
      foldIcon,
      username,
      quitLogin,
      breadcrumb1,
      breadcrumb2
    }
  }
})
</script>
<style lang='scss' scoped>
.left-box {
  display: flex;
  align-items: center;
}
.icon {
  width: 30px;
  height: 30px;
  margin-right: 6px;
  color: #fff;
}
.right-box {
  display: flex;
  align-items: center;
  margin-left: auto;
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
  color: #fff;
  .text {
    font-size: 18px;
  }
}
.el-avatar {
  margin-right: 6px;
}
.el-breadcrumb {
  /deep/.el-breadcrumb__inner {
    color: #fff;
    &:hover {
      color: #ffd04b;
    }
  }
}
</style>
