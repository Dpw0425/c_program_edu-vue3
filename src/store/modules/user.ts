import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import { defineStore } from 'pinia'
import type { UserState } from './types/type'
import { GET_TOKEN, SET_TOKEN } from '@/utils/token'

let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    }
  },
  actions: {
    // 用户登录的方法
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
  },
  getters: {},
})

export default useUserStore
