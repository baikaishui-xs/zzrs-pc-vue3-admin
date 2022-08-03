<template>
  <div class='panel-container'>
    <el-tabs type="border-card" stretch style="width: 300px">

      <!-- 账号登录 tabs -->
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="20">
              <Avatar />
            </el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>

        <el-form :model="usernameForm" :rules="usernameFormRules">
          <el-form-item prop="username" label="账号" label-width="60px">
            <el-input v-model="usernameForm.username" />
          </el-form-item>
          <el-form-item label="密码" label-width="60px">
            <el-input type="password" v-model="usernameForm.password" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 手机登录 tabs -->
      <el-tab-pane>
        <template #label>
          <span class="custom-tabs-label">
            <el-icon :size="20">
              <Iphone />
            </el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>

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

    const usernameFormRules = {
      // 表单验证规则
      username: [
        { required: true, trigger: 'blur', message: '不能为空' }, // 不能为空
        {
          pattern: /^1[3-9]\d{9}$/,
          message: '手机号格式不正确',
          trigger: 'blur'
        } // 手机号格式
        // { trigger: 'blur', validator: validateImgCode }  // 第三条验证规则
      ]
    }

    return {
      usernameForm,
      phoneForm,
      usernameFormRules
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
.custom-tabs-label {
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    margin-left: 3px;
  }
}
</style>
