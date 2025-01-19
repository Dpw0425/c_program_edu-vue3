import type { App } from 'vue'
// 引入项目中的全局组件
import SvgIcon from './SvgIcon/index.vue'

// 引入 element-plus 提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGlobalComponents: Record<string, any> = { SvgIcon }

// 对外暴露自定义插件对象
export default {
  install(app: App): void {
    Object.keys(allGlobalComponents).forEach((key: string) => {
      app.component(key, allGlobalComponents[key])
    })
    // 注册 element-plus 提供的图标为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
