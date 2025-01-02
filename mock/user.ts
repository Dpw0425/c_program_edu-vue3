import { messageConfig } from 'element-plus'

// 定义用户结构的接口
interface User {
  user_id: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

// 创建用户列表的函数
function createUserList(): User[] {
  return [
    {
      user_id: 1,
      avatar:
        'https://img1.baidu.com/it/u=3001150338,397170470&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1422',
      username: 'admin',
      password: '123456',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'admin token',
    },
    {
      user_id: 2,
      avatar:
        'https://pic.rmb.bdstatic.com/bjh/news/57e572cd41520408ebbbe5e3a6fb5b6d.jpeg',
      username: 'system',
      password: '123456',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'system token',
    },
  ]
}

// 定义请求的响应结构
interface LoginResponse {
  code: number
  data: {
    message?: string
    token?: string
  }
}

interface Request {
  headers: {
    token: string
  }
}

interface UserInfoResponse {
  code: number
  data: {
    message?: string
    checkUser?: User
  }
}
// 导出用户登录接口的配置
export default [
  // 用户登录接口
  {
    url: '/api/v1/user/login', // 请求地址
    method: 'post', // 请求方式
    response: ({
      body,
    }: {
      body: { username: string; password: string }
    }): LoginResponse => {
      const { username, password } = body
      const users = createUserList()
      const checkUser = users.find(
        (item) => item.username === username && item.password === password,
      )

      if (!checkUser) {
        return { code: 201, data: { message: '账号或密码错误' } }
      }

      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
]
