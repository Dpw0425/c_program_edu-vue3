import type { NormalData, ResponseData } from "../type"

// register
export interface registerForm {
  nickname: string
  password: string
  avatar: string
  email: string
  verify_code: string
}

export interface registerResponseData extends ResponseData {
  data?: NormalData
}

// login
export interface loginForm {
  email: string
  password?: string
  verify_code?: string
}

interface tokenData {
  type: string
  access_token: string
  expires_in: string
}
export interface loginResponseData extends ResponseData {
  data?: tokenData
}

// userinfo
interface userInfo {
  user_id: number
  nick_name: string
  email: string
  avatar: string
  status: number
}
export interface userInfoResponseData extends ResponseData {
  data?: userInfo
}

// logout
export interface logoutResponseData extends ResponseData {
  data?: NormalData
}
