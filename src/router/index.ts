import 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouterOptions } from 'vue-router'
import Layout from '@/layout/index.vue'
import { useStore } from '@/store'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    sidebar?: boolean
  }
}

const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  }
]

const privateRoutes = [
  {
    path: '',
    redirect: '/user',
    component: Layout,
    children: [
      {
        path: '/user',
        redirect: '/user/manage',
        meta: {
          title: '用户',
          sidebar: true,
          isLogin: true
        },
        children: [
          {
            path: '/user/manage',
            component: () => import('@/views/user-manage/index.vue'),
            meta: {
              title: '用户管理',
              sidebar: true
            }
          },
          {
            path: '/user/role',
            component: () => import('@/views/role-list/index.vue'),
            meta: {
              title: '角色列表',
              sidebar: true
            }
          },
          {
            path: '/user/permission',
            component: () => import('@/views/permission-list/index.vue'),
            meta: {
              title: '权限列表',
              sidebar: true
            }
          },
          {
            path: '/user/info/:id',
            component: () => import('@/views/user-info/index.vue'),
            meta: {
              title: '用户信息'
            }
          },
          {
            path: '/user/import',
            component: () => import('@/views/import/index.vue'),
            meta: {
              title: 'Excel导入'
            }
          }
        ]
      },
      {
        path: '/article',
        redirect: '/article/ranking',
        meta: {
          title: '文章',
          sidebar: true,
          isLogin: true
        },
        children: [
          {
            path: '/article/ranking',
            component: () => import('@/views/article-ranking/index.vue'),
            meta: {
              title: '文章排名',
              sidebar: true
            }
          },
          {
            path: '/article/:id',
            component: () => import('@/views/article-detail/index.vue'),
            meta: {
              title: '文章详情'
            }
          },
          {
            path: '/article/create',
            component: () => import('@/views/article-create/index.vue'),
            meta: {
              title: '创建文章',
              sidebar: true
            }
          },
          {
            path: '/article/editor/:id',
            component: () => import('@/views/article-create/index.vue'),
            meta: {
              title: '文章编辑'
            }
          }
        ]
      },
      {
        path: '/setting',
        redirect: '/setting/theme',
        meta: {
          title: 'setting',
          sidebar: true,
          isLogin: true
        },
        children: [
          {
            path: '/setting/theme',
            name: 'theme',
            component: () => import('@/views/setting/theme.vue'),
            meta: {
              title: 'theme',
              sidebar: true
            }
          }
        ]
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404.vue')
      }
    ]
  }
]

const router = createRouter(<RouterOptions>{
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes]
})

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ name: '404' })
  } else {
    next()
  }
})

export default router
