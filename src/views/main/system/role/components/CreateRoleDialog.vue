<template>
  <el-dialog v-bind="dialogConfig" v-model="isShow" @close="close" destroy-on-close>
    <el-form :model="formData" :rules="formRules" ref="formRef">
      <el-form-item label="新建角色" label-width="80px" prop="name">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="角色介绍" label-width="80px" prop="intro">
        <el-input v-model="formData.intro" />
      </el-form-item>
    </el-form>
    <el-tree v-bind="treeConfig" ref="treeRef" />
    <template #footer>
      <el-button class="cancel" @click="cancel">取消</el-button>
      <el-button class="sure" type="primary" @click="sure">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang='ts'>
import { defineComponent, computed, watch, ref, reactive } from 'vue'
import { apiNewRole } from '@/api/apiRole'
import { apiGetMenuList } from '@/api/apiMenuManage'
import { ElForm } from 'element-plus'
import store from '@/store'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'CreateRoleDialog',
  setup() {
    // 对话框组件配置项
    const dialogConfig = {
      title: '新建角色',
      width: '30%'
    }

    // 是否显示对话框
    const isShowCreateRoleDialog = computed(
      () => store.state.role.isShowCreateRoleDialog
    )
    let isShow = ref(false)
    watch(isShowCreateRoleDialog, (newValue) => (isShow.value = newValue))

    // 对话框关闭事件
    const close = () => {
      formRef.value?.resetFields() // 表单重置
      store.commit('role/setIsShowCreateRoleDialog', false)
    }

    // 取消按钮
    const formRef = ref<InstanceType<typeof ElForm>>()
    const cancel = () => {
      close()
    }

    // 确定按钮
    const sure = () => {
      // 表单预验证
      formRef.value?.validate(async (isOK) => {
        if (isOK) {
          formData.menuList = treeRef.value?.getCheckedKeys()
          await apiNewRole(formData)
          ElMessage({
            showClose: true,
            message: '新建角色成功',
            type: 'success'
          })
          store.dispatch('role/getRoleList')
          close()
        }
      })
    }

    // 表单数据
    let formData = reactive({
      name: '',
      intro: '',
      menuList: ''
    })

    // 表单验证规则
    const formRules = {
      name: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      intro: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ]
    }

    // el-tree 组件配置项
    let treeRef = ref()
    let treeData = ref([])
    const getMenuList = async () => {
      const { list } = await apiGetMenuList()
      treeData.value = list
    }
    getMenuList()
    const treeConfig = {
      data: treeData,
      ['show-checkbox']: true,
      ['node-key']: 'id',
      props: {
        children: 'children',
        label: 'name'
      },
      ['check-strictly']: true
    }

    return {
      isShow,
      close,
      dialogConfig,
      cancel,
      sure,
      formData,
      formRules,
      formRef,
      treeRef,
      treeConfig
    }
  }
})
</script>
<style lang='scss' scoped></style>
