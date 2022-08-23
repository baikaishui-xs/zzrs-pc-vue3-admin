<template>
  <PubTableList :listData="goodsList" :tableColumnConfig=" tableColumnConfig" :showIndexCol="showIndexCol" :title="title">
    <!-- 自定义列 -->
    <template #goodsImg={row}>
      <el-image style="width: 70px; height: 105px;" :src="row.imgUrl" :preview-src-list="[row.imgUrl]" hide-on-click-modal preview-teleported />
    </template>
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
  name: 'GoodsTableList',
  components: {
    PubTableList
  },
  setup() {
    let goodsList = computed(() => store.state.goods.goodsList)

    const getGoodsList = () => {
      store.dispatch('goods/getGoodsList', { size: 5 })
    }

    getGoodsList()

    const tableColumnConfig = [
      { label: '商品名称', prop: 'name', align: 'center' },
      {
        label: '原价格',
        prop: 'oldPrice',
        align: 'center'
      },
      {
        label: '现价格',
        prop: 'newPrice',
        align: 'center'
      },
      {
        label: '商品图片',
        prop: 'imgUrl',
        align: 'center',
        width: '100',
        slotName: 'goodsImg'
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

    const title = '商品列表'

    return {
      goodsList,
      tableColumnConfig,
      showIndexCol,
      Delete,
      Edit,
      title
    }
  }
})
</script>
<style lang='scss' scoped></style>
