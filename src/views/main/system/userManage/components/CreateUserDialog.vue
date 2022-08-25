<template>
  <el-dialog v-bind="dialogConfig" v-model="isShow" @close="close">
    <el-form :model="createUserForm" :rules="formRules" ref="formRef">
      <el-form-item label="用户名" label-width="80px" prop="name">
        <el-input v-model="createUserForm.name" />
      </el-form-item>
      <el-form-item label="真实姓名" label-width="80px" prop="realname">
        <el-input v-model="createUserForm.realname" />
      </el-form-item>
      <el-form-item label="用户密码" label-width="80px" prop="password">
        <el-input v-model="createUserForm.password" />
      </el-form-item>
      <el-form-item label="电话号码" label-width="80px" prop="cellphone">
        <el-input v-model="createUserForm.cellphone" />
      </el-form-item>
      <el-form-item label="选择部门" label-width="80px" prop="departmentId">
        <el-select v-model="createUserForm.departmentId" placeholder="请选择" @focus="getDepartmentList" style="width: 100%">
          <el-option v-for="item in departmentList" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择角色" label-width="80px" prop="roleId">
        <el-select v-model="createUserForm.roleId" placeholder="请选择" @visible-change="visibleChange" style="width: 100%">
          <el-option v-for="item in roleList" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button class="cancel" @click="cancel">取消</el-button>
      <el-button class="sure" type="primary" @click="sure">确定</el-button>
    </template>
  </el-dialog>
</template>
<script lang='ts'>
import { defineComponent, computed, ref, watch, reactive } from 'vue'
import {
  apiGetDepartmentList,
  apiGetRoleList,
  apiCreateUser
} from '@/api/apiUserManage'
import store from '@/store'
import { ElForm } from 'element-plus'
export default defineComponent({
  name: 'CreateUserDialog',
  setup() {
    const dialogConfig = {
      title: '新建用户',
      width: '30%'
    }

    const isShowCreateUserDialog = computed(
      () => store.state.userManage.isShowCreateUserDialog
    )
    let isShow = ref(false)
    watch(isShowCreateUserDialog, (newValue) => (isShow.value = newValue))

    const changeIsShowDialog = (newValue: boolean) => {
      store.commit('userManage/setIsShowCreateUserDialog', newValue)
    }

    const close = () => {
      store.commit('userManage/setIsShowCreateUserDialog', false)
      formRef.value?.resetFields()
    }

    const cancel = () => {
      store.commit('userManage/setIsShowCreateUserDialog', false)
    }

    const sure = async () => {
      formRef.value?.validate(async (isOK) => {
        if (isOK) {
          await apiCreateUser(createUserForm)
          await store.dispatch('userManage/getUserList')
          store.commit('userManage/setIsShowCreateUserDialog', false)
        }
      })
    }

    // --------------
    let departmentList: any = ref([])
    const getDepartmentList = async () => {
      const { list } = await apiGetDepartmentList()
      departmentList.value = list
    }

    let roleList: any = ref([])
    const getRoleList = async () => {
      const { list } = await apiGetRoleList()
      roleList.value = list
    }

    const createUserForm = reactive({
      name: '',
      realname: '',
      password: '',
      cellphone: '',
      departmentId: '',
      roleId: ''
    })

    const visibleChange = (val: boolean) => {
      if (val) {
        getRoleList()
      }
    }

    // 表单验证
    const formRules = {
      // 表单验证规则
      name: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      realname: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      password: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      cellphone: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      departmentId: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ],
      roleId: [
        { required: true, trigger: 'blur', message: '不能为空' } // 不能为空
      ]
    }
    const formRef = ref<InstanceType<typeof ElForm>>()

    return {
      changeIsShowDialog,
      isShow,
      close,
      dialogConfig,
      createUserForm,
      departmentList,
      roleList,
      getDepartmentList,
      getRoleList,
      sure,
      cancel,
      visibleChange,
      formRules,
      formRef
    }
  }
})
</script>
<style lang='scss' scoped>
.cancel,
.sure {
  height: 40px;
}
</style>
