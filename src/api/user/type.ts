import type { NormalData, ResponseData } from '../type'

// register
export interface registerForm {
  user_name: string
  password: string
  student_id: string
  avatar: string
  email: string
  grade: number | null
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
  user_id: string
  user_name: string
  student_id: string
  email: string
  avatar: string
  grade: number
  status: number
}
export interface userInfoResponseData extends ResponseData {
  data?: userInfo
}

// logout
export interface logoutResponseData extends ResponseData {
  data?: NormalData
}
