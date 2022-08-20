import {App} from 'vue'
import dayjs from 'dayjs'

export default function registerProperties(app: App) {
  app.config.globalProperties.$dayjs = dayjs
}

