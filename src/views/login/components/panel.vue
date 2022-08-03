<template>
  <div class='panel-container'>
    <el-tabs type="border-card" stretch style="width: 300px">
      <el-tab-pane label="账号登录">
        <el-form :model="usernameForm">
          <el-form-item label="账号" label-width="60px">
            <el-input v-model="usernameForm.username" />
          </el-form-item>
          <el-form-item label="密码" label-width="60px">
            <el-input v-model="usernameForm.password" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="手机登录">
        <el-form :model="phoneForm" label-width="120px">
          <el-form-item label="手机号" label-width="60px">
            <el-input v-model="phoneForm.username" />
          </el-form-item>
          <el-form-item label="验证码" label-width="60px">
            <div class="code-box">
              <el-input v-model="phoneForm.password" />
              <el-button class="btn" type="primary">获取验证码</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'Panel',
  setup() {
    const usernameForm = reactive({
      username: '',
      password: ''
    })

    const phoneForm = reactive({
      username: '',
      password: ''
    })

    return {
      usernameForm,
      phoneForm
    }
  }
}
</script>

<style lang='scss' scoped>
.code-box {
  display: flex;
  .btn {
    margin-left: 10px;
  }
}
</style>
