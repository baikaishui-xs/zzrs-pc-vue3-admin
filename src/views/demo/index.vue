<template>
  <div>demo</div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import store from '@/store'
export default defineComponent({
  name: 'demo',
  setup() {
    store.dispatch('demo/getDemo')
  }
})
</script>
<style lang='scss' scoped></style>
