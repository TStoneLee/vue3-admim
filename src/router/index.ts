import { createRouter,createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Layout from '@/layout/index.vue'

/**
 * 实现当前路由刷新
  解决一下两点问题
  - vue中通过一个重定向中间页实现当前路由刷新 利用路由router.replace
  - 实现当前路由刷新 路由不能被keep-alive缓存 目前我们是默认全部缓存 
 */
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
      meta: {
        title: 'Dashboard',
        icon: 'el-icon-platform-eleme',
        affix: true
      }
    }]
  },
  {
    path: '/redirect',
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  }
]

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/documentation',
    component: Layout,
    redirect: '/documentation/index',
    children: [{
      path: 'index',
      name: 'Documentation',
      component: () => import(/* webpackChunkName: "documentation" */'@/views/documentation/index.vue'),
      meta: {
        title: 'Documentation',
        icon: 'documentation',
        // hidden: true
        noCache: true
      }
    }]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
      path: 'index',
      name: 'Guide',
      component: () => import(/* webpackChunkName: "guide" */'@/views/guide/index.vue'),
      meta: {
        title: 'Guide',
        icon: 'guide'
      }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    meta: {
      title: 'System',
      icon: 'lock',
      alwaysShow: true
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */'@/views/system/menu.vue'),
        meta: {
          title: 'Menu Management',
          icon: 'list',
          // hidden: true
        }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "role" */'@/views/system/role.vue'),
        meta: {
          title: 'Role Management',
          icon: 'list',
          // hidden: true
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */'@/views/system/user.vue'),
        meta: {
          title: 'User Management',
          icon: 'list'
        }
      }
    ]
  },
  { // 外链路由
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://www.baidu.com/',
        redirect: '/',
        meta: {
          title: 'External Link',
          icon: 'link'
        }
      }
    ]
  }
]

export const routes = [
  ...constantRoutes,
  ...asyncRoutes
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router