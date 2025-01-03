// 存储 token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

// 读取 token
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}
