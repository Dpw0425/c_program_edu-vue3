import { createApp } from 'vue'
import App from '@/App.vue'

// 引入 element-plus 插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 配置 element-plus 国际化
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 配置 svg 插件
// @ts-ignore
import 'virtual:svg-icons-register'

// 引入自定义插件对象: 注册整个项目的全局组件
import globalComponents from '@/components'

// 引入模板的全局样式
import '@/styles/index.scss'

// 引入路由
import router from './router'

// 获取应用实例对象
const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn, // element-plus 国际化
})

// 安装自定义插件
app.use(globalComponents)

// 注册路由
app.use(router)

// 挂载应用
app.mount('#app')
