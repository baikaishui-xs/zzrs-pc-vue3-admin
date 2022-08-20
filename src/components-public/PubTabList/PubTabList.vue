<template>
  <el-table :data="listData" border stripe>
    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column v-for="(item, index) in tableColumnConfig" :key="index" v-bind="item">
      <template #default="{row}">
        <slot :name="item.slotName" :row="row">
          {{row[item.prop]}}
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PubTabList',
  props: {
    listData: {
      type: Array,
      required: true
    },
    tableColumnConfig: {
      type: Array,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang='scss' scoped></style>
