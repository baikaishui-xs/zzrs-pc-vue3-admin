<template>
  <el-form ref="usernameFormRef" :model="usernameForm" :rules="usernameFormRules">
    <el-form-item prop="name" label="账号" label-width="60px">
      <el-input v-model="usernameForm.name" />
    </el-form-item>
    <el-form-item prop="password" label="密码" label-width="60px">
      <el-input type="password" v-model="usernameForm.password" show-password />
    </el-form-item>
  </el-form>
</template>
<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AccountTab',
  setup() {
    const store = useStore()
    const router = useRouter()

    const usernameForm = reactive({
      name: localStorage.getItem('name') || '', // 账号
      password: localStorage.getItem('password') || '' // 密码
    })

    const usernameFormRules = {
      // 表单验证规则
      name: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
        // { trigger: 'blur', validator: validateImgCode }  // 第三条验证规则
      ],
      password: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ]
    }

    const usernameFormRef = ref<InstanceType<typeof ElForm>>()

    const login = (isRememberPassword: boolean) => {
      usernameFormRef.value?.validate(async (isOK) => {
        if (isOK) {
          await store.dispatch('user/userLogin', usernameForm)
          router.push('./main')
          if (isRememberPassword) {
            localStorage.setItem('name', usernameForm.name)
            localStorage.setItem('password', usernameForm.password)
            localStorage.setItem('isRememberPassword', 'true')
          } else {
            localStorage.setItem('name', '')
            localStorage.setItem('password', '')
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
