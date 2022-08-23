<template>
  <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizeList" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, sizes, prev, pager, next, jumper" />
</template>
<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'
import store from '@/store'
export default defineComponent({
  name: 'GoodsPagination',
  setup() {
    let currentPage = ref(1) // 当前所在页码
    let pageSizeList = [5, 10, 20, 30, 40] // 每页显示多少条数据
    let pageSize = ref(5) // 每页显示多少条数据
    let total = computed(() => store.state.goods.totalCount) // 共多少条数据
    let offset = 0 // 跳过多少条数据

    const handleCurrentChange = (val: any) => {
      // 监听页码
      offset = val * pageSize.value - pageSize.value
      store.dispatch('goods/getGoodsList', {
        size: pageSize.value,
        offset: offset
      })
    }

    const handleSizeChange = (val: any) => {
      // 监听 pageSize
      pageSize.value = val
      store.dispatch('goods/getGoodsList', {
        size: pageSize.value,
        offset: offset
      })
    }

    return {
      currentPage,
      pageSizeList,
      total,
      handleCurrentChange,
      handleSizeChange,
      pageSize
    }
  }
})
</script>
<style lang='scss' scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
