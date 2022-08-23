<template>
  <div class="box-bd">
    <PubTableList :listData="userList" :tableColumnConfig=" tableColumnConfig" :showIndexCol="showIndexCol" :title="title">
      <!-- 头部按钮 -->
      <template #headerBtn>
        <el-button class="new-user-btn" type="primary">新建用户</el-button>
      </template>

      <!-- 自定义列 -->
      <template #enable={row}>
        <el-button plain :type="row.enable ? 'primary' : 'danger'">{{row.enable ? '启用' : '禁用'}}</el-button>
      </template>
      <template #operate>
        <el-button type="primary" :icon="Edit">编辑</el-button>
        <el-button type="danger" :icon="Delete">删除</el-button>
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
import { apiDelUser } from '@/api/apiUserManage'
import PubTableList from '@/components-public/PubTableList/PubTableList.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import store from '@/store'
import { usePermission } from '@/hooks/use-permission'
export default defineComponent({
  name: 'UserList',
  components: {
    PubTableList
  },
  setup() {
    store.dispatch('userManage/getUserList')
    let userList = computed(() => store.state.userManage.userList)

    const delUser = async (id: number) => {
      await apiDelUser(id)

      store.dispatch('userManage/getUserList')
    }

    const tableColumnConfig = [
      { label: '用户名', prop: 'name', align: 'center' },
      {
        label: '真实姓名',
        prop: 'realname',
        align: 'center'
      },
      {
        label: '手机号码',
        prop: 'cellphone',
        align: 'center'
      },
      {
        label: '状态',
        prop: 'enable',
        align: 'center',
        slotName: 'enable',
        width: '100'
      },
      {
        label: '创建时间',
        prop: 'createAt',
        align: 'center',
        width: '200',
        slotName: 'createAt'
      },
      {
        label: '更新时间',
        prop: 'updateAt',
        align: 'center',
        width: '200',
        slotName: 'updateAt'
      },
      { label: '操作', align: 'center', slotName: 'operate', width: '200' }
    ]

    const showIndexCol = true // 是否显示序号列

    const title = '用户列表'

    const isCreate = usePermission('users', 'create')
    const isUpdate = usePermission('users', 'update')
    const isDelete = usePermission('users', 'delete')
    const isQuery = usePermission('users', 'query')

    return {
      userList,
      delUser,
      tableColumnConfig,
      showIndexCol,
      Delete,
      Edit,
      title,
      isCreate,
      isUpdate,
      isDelete
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