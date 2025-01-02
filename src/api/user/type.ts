export interface loginForm {
  username: string
  password: string
  verify_code: string
}

interface dataType {
  token: string

}
export interface loginResponseData {
  code: number
  message: string
  data?: dataType
  error_type?: string
}
