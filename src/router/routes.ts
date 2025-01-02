export const constantRoutes = [
    {
        // 首页
        path: '/',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
    },
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login', // 命名路由
    },
]