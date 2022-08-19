<template>
  <PubFrom v-bind="pubFormConfig" v-model="PubFormData">
    <template #footer>
      <div class="footer-box">
        <el-button class="btn" type="primary" size="medium">搜索</el-button>
        <el-button class="btn" type="info">重置</el-button>
      </div>
    </template>
  </PubFrom>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import PubFrom from '@/components-public/PubForm/PubForm.vue'
import { IPubFormConfig } from '@/components-public/PubForm/types/index.b'
export default defineComponent({
  name: 'SearchForm',
  components: {
    PubFrom
  },
  setup() {
    const pubFormConfig: IPubFormConfig = {
      labelWidth: '120px',
      itemStyle: {
        padding: '10px 30px'
      },
      colLayout: {
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      },
      formItems: [
        {
          field: 'name',
          type: 'input',
          label: '用户名',
          placeholder: '请输入用户名'
        },
        {
          field: 'password',
          type: 'password',
          label: '密码',
          placeholder: '请输入密码'
        },
        {
          field: 'select',
          type: 'select',
          label: '喜欢的运动',
          placeholder: '请选择喜欢的运动',
          options: [
            { title: '篮球', value: 'basketball' },
            { title: '足球', value: 'football' }
          ]
        },
        {
          field: 'datepicker',
          type: 'datepicker',
          label: '创建时间',
          placeholder: '请选择创建时间范围',
          otherOptions: {
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            type: 'daterange'
          }
        }
      ]
    }

    const PubFormData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: ''
    })

    return {
      pubFormConfig,
      PubFormData
    }
  }
})
</script>
<style lang='scss' scoped>
.footer-box {
  text-align: right;
  padding: 0 50px 20px 0;
}
.btn {
  width: 80px;
  height: 40px;
}
</style>
