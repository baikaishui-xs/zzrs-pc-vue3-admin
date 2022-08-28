<template>
  <div class="dashboard-container">
    <el-row :gutter="10">
      <el-col v-bind="colConfig">
        <el-card>
          <CakeChart></CakeChart>
        </el-card>
      </el-col>
      <el-col v-bind="colConfig">
        <el-card>
          <RoseCakeChart></RoseCakeChart>
        </el-card>
      </el-col>
      <el-col v-bind="colConfig">
        <el-card>
          <ColumnarChart></ColumnarChart>
        </el-card>
      </el-col>
      <el-col v-bind="colConfig">
        <el-card>
          <LineChart></LineChart>
        </el-card>
      </el-col>
      <el-col v-bind="colConfig">
        <el-card>
          <RadarChart></RadarChart>
        </el-card>
      </el-col>
      <el-col v-bind="colConfig">
        <el-card>
          <DashboardChart></DashboardChart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import RoseCakeChart from './components/RoseCakeChart.vue'
import ColumnarChart from './components/ColumnarChart.vue'
import LineChart from './components/LineChart.vue'
import RadarChart from './components/RadarChart.vue'
import DashboardChart from './components/DashboardChart.vue'
import CakeChart from './components/CakeChart.vue'
export default defineComponent({
  name: 'dashboard',
  components: {
    RoseCakeChart,
    ColumnarChart,
    LineChart,
    RadarChart,
    DashboardChart,
    CakeChart
  },
  setup() {
    // rol 组件配置
    const colConfig = {
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24
    }
    return {
      colConfig
    }
  }
})
</script>
<style lang='scss' scoped>
.dashboard-container {
  .el-col {
    margin-bottom: 10px;
  }
}
</style>
