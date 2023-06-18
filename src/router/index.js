import { createRouter, createWebHashHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout'

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  // vue-router 4.x  通配符配置是如下配置不在是 *
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'dashboard',
        meta: { title: '数据看板', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: "/goods",
    component: Layout,
    meta: {
      title: "商品管理",
      icon: "goods",
    },
    name: "goods",
    redirect: "/goods/category",
    children: [
      {
        path: "category",
        component: () => import('@/views/goods/category/index.vue'),
        name: "category",
        meta: {
          title: "分类管理",
          icon: "category"
        }
      },
      {
        path: "commodity",
        component: () => import('@/views/goods/commodity'),
        name: "commodity",
        meta: {
          title: "商品列表",
          icon: "commodity"
        }
      },
      {
        path: "seek",
        component: () => import('@/views/goods/seek'),
        name: "seek",
        meta: {
          title: "求购中心",
          icon: "seek"
        }
      },
    ],
  },
  {
    path: "/topic",
    component: Layout,
    meta: {
      icon: "topic",
      title: "论坛管理",
    },
    alwaysShow:true,
    name: "topic",
    redirect: "/topic/topic",
    children: [
      {
        path: "topic",
        component: () => import('@/views/topic/topic'),
        name: "topic",
        meta: {
          title: "帖子列表",
          icon: "topic",
        }
      },
    ],
  },
  {
    path: "/user",
    component: Layout,
    meta: {
      icon: "user",
      title: "用户管理",
    },
    name: "user",
    redirect: "/user/user",
    alwaysShow:true,
    children: [
      {
        path: "user",
        component: () => import('@/views/user/user'),
        name: "user",
        meta: {
          title: "用户列表",
          icon: "user",
        },
      },
    ],
  },
  {
    path: "/info",
    component: Layout,
    meta: {
      icon: "info",
      title: "信息管理",
    },
    name: "info",
    redirect: "/info/inform",
    children: [
      {
        path: "inform",
        component: () => import('@/views/info/inform'),
        name: "inform",
        meta: {
          title: "举报信息",
          icon: "inform",
        }
      },
      {
        path: "message",
        component: () => import('@/views/info/message'),
        name: "message",
        meta: {
          title: "消息公告",
          icon: "message",
        }
      },
    ],
  },
  {
    path: "/adv",
    component: Layout,
    meta: {
      icon: "adv",
      title: "广告管理",
    },
    name: "adv",
    redirect: "/adv/adv",
    children: [
      {
        path: "adv",
        component: () => import('@/views/adv/adv'),
        name: "adv",
        meta: {
          title: "广告管理",
          icon: "adv",
        }
      }
    ],
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...constantRoutes],  // 只挂载了静态路由
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
