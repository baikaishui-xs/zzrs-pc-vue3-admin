<template>
  <el-container style="height: 100%">
    <el-aside :width="isExpandIcon ? '64px' : '200px'">
      <Aside :isExpandIcon="isExpandIcon"></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header @changeIsExpandIcon="changeIsExpandIcon"></Header>
      </el-header>
      <el-main>
        <el-card>
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
export default defineComponent({
  name: 'layout',
  components: {
    Aside,
    Header
  },
  setup() {
    let isExpandIcon = ref(false)
    const changeIsExpandIcon = (IsExpandIcon: boolean) => {
      console.log(IsExpandIcon)
      isExpandIcon.value = IsExpandIcon
    }
    return {
      isExpandIcon,
      changeIsExpandIcon
    }
  }
})
</script>
<style lang='scss' scoped>
.el-header,
.el-footer {
  background-color: #a9292c;
  color: #333;
}

.el-header {
  height: 50px;
  display: flex;
  align-items: center;
}

.el-aside {
  background-color: #a9292c;
  color: #333;
  box-shadow: rgba(0, 0, 0, 0.3) 6px 0px 6px;
  z-index: 1;
  transition: width 0.3s;
}

.el-main {
  background-color: #fff;
  color: #333;
  .el-card {
    padding-bottom: 0px;
    /deep/.el-card__body {
      padding-bottom: 0px;
    }
  }
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
