// 存储 token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('Authorization', token)
}

// 读取 token
export const GET_TOKEN = () => {
  return localStorage.getItem('Authorization')
}

// 删除本地存储 token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('Authorization')
}
