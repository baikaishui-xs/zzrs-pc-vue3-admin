<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'DashboardChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        text: '仪表盘' // 主标题
      },
      series: [
        {
          type: 'gauge', // 图表类型：仪表盘
          data: [
            // 每一个对象就代表一个指针
            {
              value: 88,
              // 指针的样式
              itemStyle: {
                color: 'red' // 指针的颜色
              }
            }
          ],
          min: 50, // 仪表盘数值范围
          max: 100
        }
      ]
    }

    // 将图表配置项设置给 echarts 实例对象
    const chartRef = ref<HTMLElement>()
    onMounted(() => {
      let { proxy }: any = getCurrentInstance()

      // 初始化 Echarts 实例对象 // 语法：init(元素, 主题, 选项)
      const chart = proxy.$echarts.init(chartRef.value!, 'light', {
        renderer: 'svg' // 渲染器
      })

      chart.setOption(chartConfig)
    })
    return {
      chartRef
    }
  }
})
</script>
<style lang='scss' scoped></style>
