export const constantRoutes = [
  {
    // 首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'Layout',
    meta: {
      title: 'layout',
    },
    redirect: '/home',
    children: [
      {
        // 首页
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'home',
        },
      },
      {
        // 题库
        path: '/questions',
        component: () => import('@/views/questions/index.vue'),
        name: 'Questions',
        meta: {
          title: '题库',
          icon: 'book',
        },
      },
      {
        // 比赛中心
        path: '/competitions',
        component: () => import('@/views/competitions/index.vue'),
        name: 'Competitions',
        meta: {
          title: '比赛中心',
          icon: 'match',
        },
      },
      {
        // 文章专栏
        path: '/articles',
        component: () => import('@/views/articles/index.vue'),
        name: 'Articles',
        meta: {
          title: '文章专栏',
          icon: 'article',
        },
      },
      {
        // 个人中心
        path: '/personal',
        component: () => import('@/views/personal/index.vue'),
        name: 'Personal',
        meta: {
          title: '个人中心',
          icon: 'user',
        },
      },
      {
        // 比赛详情
        path: '/competition/detail',
        component: () => import('@/views/competition_detail/index.vue'),
        name: 'CompetitionDetail',
        meta: {
          title: '比赛详情',
          icon: 'competition',
        },
      },
    ],
  },
  {
    // 404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '其它路由',
    },
  },
  {
    // 登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'Login', // 命名路由
    meta: {
      title: '登录',
    },
  },
  {
    // 注册
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    name: 'Register',
    meta: {
      title: '注册',
    },
  },
  {
    // 题目详情
    path: '/question/detail',
    component: () => import('@/views/question_detail/index.vue'),
    name: 'QuestionDetail',
    meta: {
      title: '题目详情',
    },
  },
]
