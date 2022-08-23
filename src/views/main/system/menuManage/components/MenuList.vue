<template>
  <PubTableList :listData="menuList" :tableColumnConfig=" tableColumnConfig" :showIndexCol="showIndexCol" :title="title" :childrenProps="childrenProps">
    <!-- 自定义列 -->
    <template #createAt={row}>
      {{$dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss')}}
    </template>
    <template #updateAt={row}>
      {{$dayjs(row.updateAt).format('YYYY-MM-DD HH:mm:ss')}}
    </template>
  </PubTableList>
</template>
<script lang='ts'>
import { defineComponent, computed } from 'vue'
import PubTableList from '@/components-public/PubTableList/PubTableList.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import store from '@/store'
export default defineComponent({
  name: 'MenuList',
  components: {
    PubTableList
  },
  setup() {
    store.dispatch('menuManage/getMenuList')
    let menuList = computed(() => store.state.menuManage.menuList)

    const tableColumnConfig = [
      { label: '菜单名称', prop: 'name', align: 'center' },
      {
        label: '类型',
        prop: 'type',
        align: 'center'
      },
      {
        label: '菜单 url',
        prop: 'url',
        align: 'center'
      },
      {
        label: '按钮权限',
        prop: 'permission',
        align: 'center'
      },
      {
        label: '菜单 icon',
        prop: 'icon',
        align: 'center',
        slotName: 'enable'
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
      }
    ]

    const showIndexCol = true // 是否显示序号列

    const title = '菜单列表'

    const childrenProps = {
      rowKey: 'id', // 唯一标识
      treeProp: {
        // 嵌套数据的配置选项
        children: 'children'
      }
    }

    return {
      menuList,
      tableColumnConfig,
      showIndexCol,
      Delete,
      Edit,
      title,
      childrenProps
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
