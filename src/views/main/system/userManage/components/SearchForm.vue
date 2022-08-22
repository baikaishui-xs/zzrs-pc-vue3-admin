<template>
  <PubFrom v-bind="PubSearchFormConfig" v-model="PubSearchFormData" @search="search"></PubFrom>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import PubFrom from '@/components-public/PubSearchForm/PubSearchForm.vue'
import { IPubSearchFormConfig } from '@/components-public/PubSearchForm/types'
import store from '@/store'
export default defineComponent({
  name: 'SearchForm',
  components: {
    PubFrom
  },
  setup() {
    const PubSearchFormConfig: IPubSearchFormConfig = {
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
          field: 'realname',
          type: 'input',
          label: '真实姓名',
          placeholder: '请输入真实姓名'
        },
        {
          field: 'cellphone',
          type: 'input',
          label: '电话号码',
          placeholder: '请输入电话号码'
        },
        {
          field: 'createAt',
          type: 'datepicker',
          label: '创建时间',
          otherOptions: {
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
            type: 'daterange'
          }
        }
      ]
    }

    const PubSearchFormData = ref({
      name: '',
      realname: '',
      cellphone: '',
      createAt: ''
    })

    const search = () => {
      store.dispatch('userManage/getUserList', PubSearchFormData.value)
    }

    return {
      PubSearchFormConfig,
      PubSearchFormData,
      search
    }
  }
})
</script>
<style lang='scss' scoped>
</style>
