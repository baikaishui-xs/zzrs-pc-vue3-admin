<template>
  <div id="xxx-chart" ref="divRef" :style="{width: '300px', height: '300px'}"></div>
  {{$demo}}
</template>
<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
export default defineComponent({
  name: 'demo',
  setup() {
    const xxxChartConfig = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // setup 生命周期中 HTML 结构还没有渲染，获取不到元素的实例，所以要放到 onMounted 生命周期中

      let { proxy }: any = getCurrentInstance()
      const xxxChart = proxy.$echarts.init(divRef.value!)
      xxxChart.setOption(xxxChartConfig)
    })

    return {
      divRef
    }
  }
})
</script>
<style lang='scss' scoped></style>
