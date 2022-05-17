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
import installElementPlus from '@/plugins/element'
const app = createApp(App)

app.use(store)
  .use(router)
  .use(initSvgIcon)
  .use(installElementPlus)
  .use(ElementPlus)
  .mount('#app')