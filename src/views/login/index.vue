<template>
  <div class='login-container'>
    <div class="main">
      <h1 class="title">后台管理系统</h1>
      <Panel ref="panelRef"></Panel>
      <div class="password-options">
        <div class="left-box">
          <el-checkbox v-model="isRememberPassword" label="记住密码" />
        </div>
        <div class="right-box">
          <el-link type="primary" class="forgetPassword">忘记密码</el-link>
        </div>
      </div>
      <el-button class="btn" type="primary" @click="login">立即登录</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Panel from './components/Panel2.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Login',
  components: {
    Panel
  },
  setup() {
    const isRememberPassword = ref(!!localStorage.getItem('isRememberPassword')) // 是否 记住密码
    const panelRef = ref()

    const login = async () => {
      panelRef.value.$refs.accountTabRef.login(isRememberPassword.value)
    }

    return {
      isRememberPassword,
      login,
      panelRef
    }
  }
})
</script>
<style lang='scss' scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b81324;
  .main {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 10px;
  }
  .title {
  }

  .password-options {
    width: 100%;
    margin: 6px 0;
    display: flex;
    justify-content: space-between;
    color: #409dff;
    .left-box {
      .icon {
      }

      .text {
      }
    }

    .right-box {
      .text {
      }
    }
  }

  .btn {
    width: 100%;
    height: 40px;
  }
}
.forgetPassword {
  height: 32px;
}
</style>
