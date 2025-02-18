import { reqLogin, reqRegister, reqUserInfo } from '@/api/user'
import type {
  loginForm,
  loginResponseData,
  registerForm,
  registerResponseData,
} from '@/api/user/type'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      username: '',
      avatar: '',
    }
  },
  actions: {
    // 用户登录方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        // pinia 仓库存储 token
        this.token = result.data?.token as string
        // 本地持久化 token
        SET_TOKEN(result.data?.token as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 用户注册方法
    async userRegister(data: registerForm) {
      let result: registerResponseData = await reqRegister(data)
      if (result.code == 200) {
        // 处理业务
      } else {
        return Promise.reject(new Error(result.message))
      }
    },

    // 获取用户信息
    async userInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {
        
      }
    }
  },
  getters: {},
})

export default useUserStore
