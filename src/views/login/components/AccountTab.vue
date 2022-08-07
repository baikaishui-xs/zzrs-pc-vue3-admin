<template>
  <el-form ref="usernameFormRef" :model="usernameForm" :rules="usernameFormRules">
    <el-form-item prop="username" label="账号" label-width="60px">
      <el-input v-model="usernameForm.username" />
    </el-form-item>
    <el-form-item label="密码" label-width="60px">
      <el-input type="password" v-model="usernameForm.password" show-password />
    </el-form-item>
  </el-form>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
export default defineComponent({
  name: 'AccountTab',
  setup() {
    const usernameForm = reactive({
      username: localStorage.getItem('username') || '', // 账号
      password: '' // 密码
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

    const usernameFormRef = ref<InstanceType<typeof ElForm>>()

    const login = (isRememberPassword: boolean) => {
      usernameFormRef.value?.validate((isOK) => {
        if (isOK) {
          if (isRememberPassword) {
            localStorage.setItem('username', usernameForm.username)
            localStorage.setItem('isRememberPassword', 'true')
          } else {
            localStorage.setItem('username', '')
            localStorage.setItem('isRememberPassword', '')
          }
        }
      })
    }

    return {
      usernameForm,
      usernameFormRules,
      login,
      usernameFormRef
    }
  }
})
</script>
<style lang='scss' scoped></style>
