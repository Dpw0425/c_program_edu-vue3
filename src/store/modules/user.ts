import { reqLogin, reqLogout, reqRegister, reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from '../types/user'
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
      user_id: null,
      user_name: '',
      student_id: '',
      email: '',
      avatar: '',
      grade: null,
      status: null,
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
        this.user_name = result.data?.user_name as string
        this.student_id = result.data?.student_id as string
        this.email = result.data?.email as string
        this.avatar = result.data?.avatar as string
        this.grade = result.data?.grade as number
        this.status = result.data?.status as number

        return 'ok'
      } else {
        return Promise.reject('获取用户信息失败！')
      }
    },

    // 退出登录
    async userLogout() {
      await reqLogout()
      this.user_id = null
      this.user_name = ''
      this.student_id = ''
      this.email = ''
      this.avatar = ''
      this.grade = null
      this.status = null

      REMOVE_TOKEN()
      location.reload()
      return 'ok'
    },
  },
  getters: {},
})

export default useUserStore
