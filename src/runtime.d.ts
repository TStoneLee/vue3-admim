import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { Size } from "./plugins/element";
//  自定义类型声明不能放在env.d.ts里，会导致.vue文件不能识别。
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: typeof ElMessage,
    $notify: typeof ElNotification,
    $confirm: typeof ElMessageBox.confirm,
    $alert: typeof ElMessageBox.alert,
    $prompt: typeof ElMessageBox.prompt,
    $confirm: typeof ElMessageBox.confirm,
    $ELEMENT: {
      size: Size
    }
  }
}