<template>
  <el-dialog v-bind="dialogConfig" v-model="isShowDialog" @close="close">
    <el-form :model="userInfoDeep" :rules="formRules" ref="formRef">
      <el-form-item label="用户名" label-width="80px" prop="name">
        <el-input v-model="userInfoDeep.name" />
      </el-form-item>
      <el-form-item label="真实姓名" label-width="80px" prop="realname">
        <el-input v-model="userInfoDeep.realname" />
      </el-form-item>
      <el-form-item label="电话号码" label-width="80px" prop="cellphone">
        <el-input v-model="userInfoDeep.cellphone" />
      </el-form-item>
      <el-form-item label="选择部门" label-width="80px" prop="departmentId">
        <el-select v-model="userInfoDeep.departmentId" placeholder="请选择" @focus="getDepartmentList" style="width: 100%">
          <el-option v-for="item in departmentList" :key="item.name" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择角色" label-width="80px" prop="roleId">
        <el-select v-model="userInfoDeep.roleId" placeholder="请选择" @visible-change="visibleChange" style="width: 100%">
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
import { defineComponent, computed, ref, watch } from 'vue'
import { ElForm } from 'element-plus'
import {
  apiGetDepartmentList,
  apiGetRoleList,
  apiEditUser
} from '@/api/apiUserManage'
import store from '@/store'
export default defineComponent({
  name: 'EditUserDialog',
  setup() {
    const dialogConfig = {
      title: '编辑用户',
      width: '30%'
    }

    const isShoEditUserDialog = computed(
      () => store.state.userManage.isShowEditUserDialog
    )
    let isShowDialog = ref(false)
    watch(isShoEditUserDialog, (newValue) => (isShowDialog.value = newValue))

    const changeIsShowDialog = (newValue: boolean) => {
      store.commit('userManage/setIsShowEditUserDialog', newValue)
    }

    const close = () => {
      store.commit('userManage/setIsShowEditUserDialog', false)
    }

    const cancel = () => {
      store.commit('userManage/setIsShowEditUserDialog', false)
    }

    const sure = async () => {
      formRef.value?.validate(async (isOK) => {
        if (isOK) {
          const UserID = store.state.userManage.userInfo.id
          const userInfoField = {
            cellphone: userInfoDeep.cellphone,
            departmentId: userInfoDeep.departmentId,
            name: userInfoDeep.name,
            realname: userInfoDeep.realname,
            roleId: userInfoDeep.roleId
          }
          await apiEditUser(UserID, userInfoField)
          await store.dispatch('userManage/getUserList')
          store.commit('userManage/setIsShowEditUserDialog', false)
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

    let userInfo = computed(() => store.state.userManage.userInfo)
    let userInfoDeep = userInfo.value
    watch(userInfo, (newValue) => {
      Object.assign(userInfoDeep, newValue)
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
      isShowDialog,
      close,
      dialogConfig,
      userInfo,
      userInfoDeep,
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
