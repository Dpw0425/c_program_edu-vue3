// register
export interface registerForm {
  nickname: string
  password: string
  avatar: string
  email: string
  verify_code: string
}

interface normalData {}
export interface registerResponseData {
  code: number
  message: string
  data?: normalData
  error_type?: string
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
export interface loginResponseData {
  code: number
  message: string
  data?: tokenData
  error_type?: string
}

// userinfo
interface userInfo {
  user_id: number
  nick_name: string
  email: string
  avatar: string
  status: number
}
export interface userInfoResponseData {
  code: number
  message: string
  data?: userInfo
  error_type?: string
}
