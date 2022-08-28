<template>
  <CakeChart></CakeChart>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import CakeChart from './components/CakeChart.vue'
export default defineComponent({
  name: 'dashboard',
  components: {
    CakeChart
  }
})
</script>
<style lang='scss' scoped></style>
