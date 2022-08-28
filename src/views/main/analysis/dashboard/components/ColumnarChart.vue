<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'ColumnarChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        // 标题组件
        text: '柱状图' // 主标题
      },
      xAxis: {
        // 直角坐标系中的 x 轴
        type: 'category', // category：类目轴
        data: ['小明', '小红', '小王'] // x 轴数据
      },
      yAxis: {
        // 直角坐标系中的 y 轴
        type: 'value' // value：数值轴
      },
      series: [
        // 系列列表。每个系列通过 type 决定图表类型
        {
          name: '语文',
          type: 'bar', // bar：柱状图  line：折线图  饼图：pie
          markPoint: {
            // 标记效果
            data: [
              {
                type: 'max',
                name: '最大值'
              },
              {
                type: 'min',
                name: '最小值'
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average',
                name: '平均值'
              }
            ]
          },
          // 显示效果
          label: {
            show: true, // 显示类目的数值
            position: 'top' // 类目数值的位置
          },
          barWidth: '50%', // 柱的宽度
          data: [70, 92, 87] // y 轴数据
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
