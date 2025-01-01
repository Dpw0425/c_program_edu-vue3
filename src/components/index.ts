import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

const allGlobalComponents: Record<string, any> = { SvgIcon }

// 对外暴露自定义插件对象
export default {
  install(app: App): void {
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
  },
}
