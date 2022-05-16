import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'
// 初始化css 重置css默认样式
import 'normalize.css/normalize.css'
// 全局 css
import '@/styles/index.scss'

import initSvgIcon from '@/icons/index'
const app = createApp(App)

app.use(store)
  .use(router)
  .use(initSvgIcon)
  .use(ElementPlus)
  .mount('#app')