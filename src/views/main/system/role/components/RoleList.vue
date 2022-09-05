<template>
  <div class="box-bd">
    <PubTableList v-bind="pubTableListConfig" :listData="roleList">
      <!-- 头部按钮 -->
      <template #headerBtn>
        <el-button class="new-user-btn" type="primary" @click="createRole">新建角色</el-button>
      </template>

      <!-- 自定义列 -->
      <template #operate={row}>
        <el-button type="primary" :icon="Edit" @click="editBtn(row)">编辑</el-button>
        <el-button type="danger" :icon="Delete" @click="deleteRole(row)">删除</el-button>
      </template>
      <template #createAt={row}>
        {{$dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
      <template #updateAt={row}>
        {{$dayjs(row.updateAt).format('YYYY-MM-DD HH:mm:ss')}}
      </template>
    </PubTableList>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { apiDelRole } from '@/api/apiRole'
import PubTableList from '@/components-public/PubTableList/PubTableList.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import store from '@/store'
import { usePermission } from '@/hooks/use-permission'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'RoleList',
  components: {
    PubTableList
  },
  setup() {
    store.dispatch('role/getRoleList')
    let roleList = computed(() => store.state.role.roleList)

    const deleteRole = async (rowInfo: any) => {
      await apiDelRole(rowInfo.id)

      ElMessage({
        showClose: true,
        message: '删除角色成功',
        type: 'success'
      })

      store.dispatch('role/getRoleList')
    }

    const tableColumnConfig = [
      { label: '角色名', prop: 'name', align: 'center' },
      {
        label: '权限介绍',
        prop: 'intro',
        align: 'center'
      },
      {
        label: '创建时间',
        prop: 'createAt',
        align: 'center',
        slotName: 'createAt'
      },
      {
        label: '更新时间',
        prop: 'updateAt',
        align: 'center',
        slotName: 'updateAt'
      },
      { label: '操作', align: 'center', slotName: 'operate', width: '200' }
    ]

    const pubTableListConfig = {
      tableColumnConfig,
      showIndexCol: true,
      title: '角色列表'
    }

    const isCreate = usePermission('users', 'create')
    const isUpdate = usePermission('users', 'update')
    const isDelete = usePermission('users', 'delete')
    const isQuery = usePermission('users', 'query')

    const createRole = () => {
      store.commit('role/setIsShowCreateRoleDialog', true)
    }

    const editBtn = (rowInfo: any) => {
      store.commit('role/setIsShowEditRoleDialog', true)
      store.commit('role/setRowInfo', rowInfo)

      // 设置 defaultCheckedKeys
      const defaultCheckedKeys: any = []
      rowInfo.menuList.map((item: any) => {
        // store.state.user.roleMenuTree.map((item: any) => {
        defaultCheckedKeys.push(item.id)
        item.children.map((item1: any) => {
          defaultCheckedKeys.push(item1.id)
        })
      })
      store.commit('role/setDefaultCheckedKeys', defaultCheckedKeys)
    }

    return {
      roleList,
      tableColumnConfig,
      Delete,
      Edit,
      isCreate,
      isUpdate,
      isDelete,
      createRole,
      editBtn,
      pubTableListConfig,
      deleteRole
    }
  }
})
</script>
<style lang='scss' scoped>
.box-hd {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 900;
  }
}
.new-user-btn {
  height: 40px;
}
</style>
