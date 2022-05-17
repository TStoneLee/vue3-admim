import { App } from 'vue'
import {
  ElButton,
  ElMessage,
  ElNotification,
  ElMessageBox,
  ElMenu,
  ElMenuItem,
  ElSubMenu
} from 'element-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn' 

export type Size = 'default' | 'medium' | 'small' | 'mini'
export default (app: App) => {
  // app.component()
  app.use(ElementPlus, {
    locale: zhCn
  })

  // 按需导入组件列表
  const components = [
    ElButton,
    ElMessage,
    ElNotification,
    ElMessageBox,
    ElMenu,
    ElMenuItem,
    ElSubMenu
  ]
  components.forEach(component => {
    app.use(component)
  })
  // Vue.prototype 替换为 config.globalProperties
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
  
  app.config.globalProperties.$ELEMENT = {
    size: 'medium',
    // zIndex: 2000 弹框zIndex默认值：2000
  }
}






