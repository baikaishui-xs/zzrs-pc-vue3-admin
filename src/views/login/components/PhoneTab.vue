<template>
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
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'PhoneTab',
  setup() {
    const phoneForm = reactive({
      username: '功能还在开发中...',
      password: ''
    })
    return {
      phoneForm
    }
  }
})
</script>
<style lang='scss' scoped>
.code-box {
  display: flex;
  .btn {
    margin-left: 10px;
  }
}
</style>
