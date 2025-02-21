import { reqLogin, reqLogout, reqRegister, reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { GET_TOKEN, REMOVE_TOKEN, SET_TOKEN } from '@/utils/token'
import type {
  loginForm,
  loginResponseData,
  registerForm,
  registerResponseData,
  userInfoResponseData,
} from '@/api/user/type'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      user_id: 0,
      nickname: '',
      email: '',
      avatar: '',
      status: 0,
    }
  },
  actions: {
    // 用户注册方法
    async userRegister(data: registerForm) {
      let result: registerResponseData = await reqRegister(data)
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 用户登录方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        // pinia 仓库存储 token
        this.token = result.data?.access_token as string
        // 本地持久化 token
        SET_TOKEN(result.data?.access_token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.user_id = result.data?.user_id as number
        this.nickname = result.data?.nickname as string
        this.email = result.data?.email as string
        this.avatar = result.data?.avatar as string
        this.status = result.data?.status as number

        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },

    // 退出登录
    async userLogout() {
      let result = await reqLogout()
      if (result.code == 200) {
        this.user_id = 0
        this.nickname = ''
        this.email = ''
        this.avatar = ''
        this.status = 0

        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
