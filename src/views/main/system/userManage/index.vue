<template>
  <el-card class="search-card">
    <SearchForm></SearchForm>
  </el-card>
  <el-card>
    <UserList></UserList>
  </el-card>
  <CreateUserDialog></CreateUserDialog>
  <EditUserDialog></EditUserDialog>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import SearchForm from './components/SearchForm.vue'
import UserList from './components/UserList.vue'
import CreateUserDialog from './components/CreateUserDialog.vue'
import EditUserDialog from './components/EditUserDialog.vue'
export default defineComponent({
  name: 'user',
  components: {
    SearchForm,
    UserList,
    CreateUserDialog,
    EditUserDialog
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
