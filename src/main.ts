import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store, { key } from './store'
// import ElementPlus, { Size } from 'element-plus'
// 挂载到vue实例上
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
// 初始化css 重置css默认样式
import 'normalize.css/normalize.css'
// 全局 css
import '@/styles/index.scss'

import initSvgIcon from '@/icons/index'
import installElementPlus, { Size } from '@/plugins/element'
const app = createApp(App)
const size = store.state.app.size
app.use(store, key)
  .use(router)
  .use(initSvgIcon)
  .use(installElementPlus, { size })
  .mount('#app')

// 挂载到vue实例上
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage;
    $notify: typeof ElNotification;
    $confirm: typeof ElMessageBox.confirm;
    $alert: typeof ElMessageBox.alert;
    $prompt: typeof ElMessageBox.prompt;
    $ELEMENT: {
      size: Size
    };
  }
}