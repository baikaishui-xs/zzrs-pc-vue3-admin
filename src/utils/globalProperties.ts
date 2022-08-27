import {App} from 'vue'
import dayjs from 'dayjs'
import * as echarts from 'echarts'

export default function registerProperties(app: App) {
  app.config.globalProperties.$dayjs = dayjs
  app.config.globalProperties.$echarts = echarts
}
