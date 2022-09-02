<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>

</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'CakeChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        text: '饼图',
        subtext: 'Fake Data'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        bottom: 'bottom'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '淘宝' },
            { value: 735, name: '天猫' },
            { value: 580, name: '京东' },
            { value: 484, name: '拼多多' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    // 将图表配置项设置给 echarts 实例对象
    const chartRef = ref<HTMLElement>()
    onMounted(() => {
      const proxy = getCurrentInstance()
      // let { proxy }: any = getCurrentInstance()

      // 初始化 Echarts 实例对象 // 语法：init(元素, 主题, 选项)
      const chart = proxy?.$echarts.init(chartRef.value!, 'light', {
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
