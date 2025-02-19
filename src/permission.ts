import router from '@/router'
// @ts-ignore
// 路由切换进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })

import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)

const publicPaths = [
  '/login',
  '/home',
  '/questions',
  '/competitions',
  '/articles',
  '/404',
  '/:pathMatch(.*)*',
]

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  document.title = to.meta.title + ' - C程序设计训练平台'

  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path === '/register' || to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (publicPaths.includes(to.path)) {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})
