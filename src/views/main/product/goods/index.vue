<template>
  <GoodsTableList></GoodsTableList>
  <GoodsPagination></GoodsPagination>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import GoodsTableList from './components/GoodsTableList.vue'
import GoodsPagination from './components/GoodsPagination.vue'
export default defineComponent({
  name: 'goods',
  components: {
    GoodsTableList,
    GoodsPagination
  }
})
</script>
<style lang='scss' scoped>
</style>
