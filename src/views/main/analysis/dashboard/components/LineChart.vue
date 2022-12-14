<template>
  <div id="chart" ref="chartRef" :style="{height: '300px'}"></div>
</template>
<script lang='ts'>
import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'LineChart',
  setup() {
    // 图表配置项
    const chartConfig = {
      title: {
        // 标题组件
        text: '折线图' // 主标题
      },
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        boundaryGap: false // 紧挨边缘
      },
      yAxis: {
        type: 'value',
        scale: true // 脱离 0 值比例（适合值差距不大的情况下使用，从最小的值开始，最大的值结束）
      },
      series: [
        {
          name: '康师傅',
          type: 'line', // 图标类型：折线图
          data: [
            3005, 3003, 3001, 3002, 3009, 3007, 3003, 3001, 3005, 3004, 3001,
            3009
          ], // 值差距不大,
          stack: 'all', // 堆叠图
          markPoint: {
            data: [
              {
                type: 'max' // 最大值
              },
              {
                type: 'min' // 最小值
              }
            ]
          },
          markLine: {
            data: [
              {
                type: 'average' // 平均值
              }
            ]
          },
          markArea: {
            // 标注区间
            data: [
              [
                {
                  xAxis: '1月' // 开始值
                },
                {
                  xAxis: '2月' // 结束值
                }
              ],
              [
                {
                  xAxis: '7月' // 开始值
                },
                {
                  xAxis: '8月' // 结束值
                }
              ]
            ]
          },
          smooth: true, // 线条风格：true（平滑）
          lineStyle: {
            color: 'green', // 线条颜色
            type: 'dashed' // 线条类型：dotted（虚线）solid（点线）
          },
          areaStyle: {
            // 填充
            color: 'pink' // 填充颜色
          }
        },
        {
          type: 'line',
          data: [
            2000, 3800, 1900, 500, 900, 1700, 2400, 300, 1900, 1500, 1800, 200
          ],
          stack: 'all', // 堆叠图（基于第一个系列的基础上，进行累加）
          areaStyle: {}
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
