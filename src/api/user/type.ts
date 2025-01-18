export interface loginForm {
  email: string
  password?: string
  verify_code?: string
}

interface tokenData {
  token: string
}
export interface loginResponseData {
  code: number
  message: string
  data?: tokenData
  error_type?: string
}

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
