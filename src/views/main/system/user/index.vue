<template>
  <el-card class="search-card">
    <SearchForm></SearchForm>
  </el-card>
  <el-card>
    <UserList></UserList>
  </el-card>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import SearchForm from '@/views/main/system/user/components/SearchForm.vue'
import UserList from '@/views/main/system/user/components/UserList.vue'
export default defineComponent({
  name: 'user',
  components: {
    SearchForm,
    UserList
  },
  setup() {
    return {}
  }
})
</script>
<style lang='scss' scoped>
.search-card {
  margin-bottom: 20px;
}
.hy-form {
  padding-top: 22px;
}
.el-card {
  width: 100%;
}
</style>
