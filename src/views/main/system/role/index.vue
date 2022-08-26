<template>
  <RoleList></RoleList>
  <CreateRoleDialog></CreateRoleDialog>
  <EditRoleDialog></EditRoleDialog>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import RoleList from './components/RoleList.vue'
import CreateRoleDialog from './components/CreateRoleDialog.vue'
import EditRoleDialog from './components/EditRoleDialog.vue'
export default defineComponent({
  name: 'role',
  components: {
    RoleList,
    CreateRoleDialog,
    EditRoleDialog
  }
})
</script>
<style lang='scss' scoped></style>
