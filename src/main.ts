import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { setupStore } from './store'

import 'normalize.css'
import '@/assets/styles/init.scss'

import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(store)
setupStore()
app.use(router)
app.use(ElementPlus)
app.mount('#app')
