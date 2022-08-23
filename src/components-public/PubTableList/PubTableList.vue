<template>
  <div class="header-box">
    <div class="left-box">
      <span class="title">{{title}}</span>
    </div>
    <div class="right-box">
      <slot name="headerBtn"></slot>
    </div>
  </div>
  <div class="border-box">
    <el-table :data="listData" border stripe>
      <el-table-column v-if="showIndexCol" label="序号" type="index" align="center" width="60px"></el-table-column>
      <el-table-column v-for="(item) in tableColumnConfig" :key="item.prop" v-bind="item" show-overflow-tooltip>
        <template #default="{row}">
          <slot :name="item.slotName" :row="row">
            {{row[item.prop]}}
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="footer-box">
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PubTableList',
  props: {
    listData: {
      type: Array,
      required: true
    },
    tableColumnConfig: {
      type: Array,
      required: true
    },
    showIndexCol: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>
<style lang='scss' scoped>
.header-box {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .left-box {
    display: flex;
    align-items: center;
    .title {
      font-size: 22px;
      font-weight: 900;
    }
  }
}
</style>
