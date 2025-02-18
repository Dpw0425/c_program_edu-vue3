import request from '@/utils/request'
import type {
  loginForm,
  loginResponseData,
  registerForm,
  registerResponseData,
  userInfoResponseData,
} from './type'

enum API {
  LOGIN_URL = '/user/login',
  REGISTER_URL = '/user/register',
  USERINFO_URL = '/user/info',
}

export const reqLogin = (data: loginForm) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

export const reqRegister = (data: registerForm) =>
  request.post<any, registerResponseData>(API.REGISTER_URL, data)

export const reqUserInfo = () => 
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
