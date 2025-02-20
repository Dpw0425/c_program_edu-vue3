import request from '@/utils/request'
import type { loginForm, loginResponseData, userInfoResponseData } from './type'

const USER_API = '/user'

enum API {
  REGISTER_URL = USER_API + '/register',
  LOGIN_URL = USER_API + '/login',
  USERINFO_URL = USER_API + '/info',
  LOGOUT_URL = USER_API + '/logout',
}

// 注册接口
export const reqRegister = (data: any) =>
  request.post<any, any>(API.REGISTER_URL, data)

// 登录接口
export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

// 用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)

// 退出登录
export const reqLogout = () => request.delete<any, any>(API.LOGOUT_URL)
