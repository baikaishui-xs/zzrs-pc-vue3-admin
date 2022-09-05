<template>
  <PubFrom v-bind="PubFormConfig" v-model="PubFormData"></PubFrom>
  <el-button class="search-btn" type="primary" :icon="Search" @click="search">搜索</el-button>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import PubFrom from '@/components-public/PubForm/PubForm.vue'
import { IPubFormConfig } from '@/components-public/PubForm/types'
import { Search } from '@element-plus/icons-vue'
import store from '@/store'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'SearchForm',
  components: {
    PubFrom
  },
  setup() {
    const PubFormConfig: IPubFormConfig = {
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

    const PubFormData = ref({
      name: '',
      realname: '',
      cellphone: '',
      createAt: ''
    })

    const search = () => {
      store.dispatch('userManage/getUserList', PubFormData.value)
      ElMessage({
        showClose: true,
        message: '搜索成功',
        type: 'success'
      })
    }

    return {
      PubFormConfig,
      PubFormData,
      search,
      Search
    }
  }
})
</script>
<style lang='scss' scoped>
.search-btn {
  height: 40px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
