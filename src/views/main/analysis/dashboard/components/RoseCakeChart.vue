<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'RoseCakeChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        text: '南丁格尔玫瑰图' // 主标题
      },
      series: [
        {
          type: 'pie', // 饼图
          data: [
            // 数据格式：数组中的成员是对象类型，且要包含 name 和 value 属性
            {
              name: '淘宝',
              value: 11231
            },
            {
              name: '京东',
              value: 22673
            },
            {
              name: '唯品会',
              value: 6123
            },
            {
              name: '1号店',
              value: 8989
            },
            {
              name: '聚美优品',
              value: 6700
            }
          ],
          label: {
            formatter: function (arg: any) {
              // 格式文本
              return arg.name + '平台' + arg.value + '元\n' + arg.percent + '%'
            }
          },
          radius: 100, // 饼图半径（饼图大小)
          // radius: 20%,  // 饼图半径（饼图大小)：百分比（参照宽度和高度较小的一边的一半来进行百分比设置）
          // radius: ['50%', '75%']  // 饼图半径（饼图大小)：[内圆半径, 外圆半径]
          roseType: 'radius', // 南丁格尔图（类目的半径取决于占比）
          selectedMode: 'single', // 选中效果：single（当前选中的类目分离）multiple（选中的类目分离）
          selectedOffset: 30 // 选中分离距离
        }
      ]
    }

    // 将图表配置项设置给 echarts 实例对象
    const chartRef = ref<HTMLElement>()
    onMounted(() => {
      let { proxy }: any = getCurrentInstance()
      const chart = proxy.$echarts.init(chartRef.value!, 'light', {
        // 初始化 Echarts 实例对象 // 语法：init(元素, 主题, 选项)
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
<style lang='scss' scoped>
</style>
