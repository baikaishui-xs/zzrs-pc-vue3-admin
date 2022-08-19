<template>
  <SearchForm></SearchForm>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import SearchForm from '@/views/main/system/user/components/SearchForm.vue'
export default defineComponent({
  name: 'user',
  components: {
    SearchForm
  },
  setup() {
    return {}
  }
})
</script>
<style lang='scss' scoped>
.hy-form {
  padding-top: 22px;
}
</style>
