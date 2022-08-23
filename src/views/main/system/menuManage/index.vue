<template>
  <MenuList></MenuList>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import MenuList from './components/MenuList.vue'
export default defineComponent({
  name: 'menuManage',
  components: {
    MenuList
  }
})
</script>
<style lang='scss' scoped></style>

