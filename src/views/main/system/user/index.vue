<template>
  <PubFrom v-bind="pubFormConfig"></PubFrom>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import PubFrom from '@/components-public/form/index.vue'
import { IPubFormConfig } from '@/components-public/form/types/index.b'
export default defineComponent({
  name: 'user',
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
          type: 'input',
          label: '用户名',
          placeholder: '请输入用户名'
        },
        {
          type: 'password',
          label: '密码',
          placeholder: '请输入密码'
        },
        {
          type: 'select',
          label: '喜欢的运动',
          placeholder: '请选择喜欢的运动',
          options: [
            { title: '篮球', value: 'basketball' },
            { title: '足球', value: 'football' }
          ]
        },
        {
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
    return {
      pubFormConfig
    }
  }
})
</script>
<style lang='scss' scoped>
.hy-form {
  padding-top: 22px;
}
</style>
