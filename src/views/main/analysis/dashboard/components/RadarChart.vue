<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'RadarChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        // 标题组件
        text: '雷达图' // 主标题
      },
      radar: {
        // 各个维度的最大值
        indicator: [
          {
            name: '易用性',
            max: 100
          },
          {
            name: '功能',
            max: 100
          },
          {
            name: '拍照',
            max: 100
          },
          {
            name: '跑分',
            max: 100
          },
          {
            name: '续航',
            max: 100
          }
        ],
        shape: 'polygon' // 配置雷达图最外层的图形：polygon（多边形）（默认值）circle （圆形）
      },
      series: [
        {
          type: 'radar', // 图标类型：雷达图
          label: {
            // 设置标签的样式
            show: true // 显示数值
          },
          areaStyle: {}, // 填充
          data: [
            // （3）配置数据
            {
              name: '华为手机1',
              value: [80, 90, 80, 82, 90]
            },
            {
              name: '中兴手机1',
              value: [70, 82, 75, 70, 78]
            }
          ]
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
