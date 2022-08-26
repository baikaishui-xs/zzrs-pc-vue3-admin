<template>
  <el-dialog v-bind="dialogConfig" v-model="isShowDialog" @close="close" destroy-on-close>
    <el-form :model="roleInfoDeep" :rules="formRules" ref="formRef">
      <el-form-item label="角色名" label-width="100px" prop="name">
        <el-input v-model="roleInfoDeep.name" />
      </el-form-item>
      <el-form-item label="角色介绍" label-width="100px" prop="intro">
        <el-input v-model="roleInfoDeep.intro" />
      </el-form-item>
    </el-form>
    <el-tree v-bind="treeConfig" ref="treeRef" :default-checked-keys="defaultCheckedKeys" />
    <template #footer>
      <el-button class="cancel" @click="cancel">取消</el-button>
      <el-button class="sure" type="primary" @click="sure">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang='ts'>
import { defineComponent, computed, watch, ref, reactive } from 'vue'
import { apiEditRole } from '@/api/apiRole'
import store from '@/store'
import { apiGetMenuList } from '@/api/apiMenuManage'
import { ElForm } from 'element-plus'
export default defineComponent({
  name: 'EditRoleDialog',
  setup() {
    // 对话框组件配置项
    const dialogConfig = {
      title: '编辑角色',
      width: '30%'
    }

    // 是否显示对话框
    const isShowEditDialog = computed(
      () => store.state.role.isShowEditRoleDialog
    )
    let isShowDialog = ref(false)
    watch(isShowEditDialog, (newValue) => (isShowDialog.value = newValue))

    // 对话框关闭事件
    const close = () => {
      store.commit('role/setIsShowEditRoleDialog', false)
      store.commit('role/setDefaultCheckedKeys', [])
      formRef.value?.resetFields() // 表单数据重置
    }

    // 取消按钮
    const cancel = () => {
      close()
    }

    // 确定按钮
    const sure = () => {
      formRef.value?.validate(async (isOK) => {
        if (isOK) {
          roleInfoDeep.menuList = treeRef.value?.getCheckedKeys()
          await apiEditRole(roleInfoDeep.id, roleInfoDeep)
          await store.dispatch('role/getRoleList')
          await store.dispatch(
            'user/getRoleMenuTree',
            store.state.user.userInfo.role.id
          )
          close()
        }
      })
    }

    // 数据回显
    let rowInfo = computed(() => store.state.role.rowInfo)
    let roleInfoDeep = rowInfo.value
    watch(rowInfo, (newValue) => {
      Object.assign(roleInfoDeep, newValue)
    })
    let defaultCheckedKeys = computed(() => store.state.role.defaultCheckedKeys)

    // 表单验证规则
    const formRules = {
      name: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      intro: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ]
    }

    // 表单预验证
    const formRef = ref<InstanceType<typeof ElForm>>()

    // 获取 treeData
    const treeData = ref([])
    const getMenuList = async () => {
      const { list } = await apiGetMenuList()
      treeData.value = list
    }
    getMenuList()

    // el-tree 组件配置项
    const treeRef = ref()
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
      dialogConfig,
      isShowDialog,
      close,
      cancel,
      sure,
      roleInfoDeep,
      treeData,
      treeConfig,
      treeRef,
      defaultCheckedKeys,
      formRules,
      formRef
    }
  }
})
</script>
<style lang='scss' scoped></style>
