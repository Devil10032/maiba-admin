import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [],  // 头部右上角搜索菜单 和  标签页的使用
      defaultRoutes: [],  // layout下面的Settings组件使用到了
      topbarRouters: [],  // components 下面 TopNav 组件（顶部菜单）里面使用了 
      sidebarRouters: []  // layout下面的（侧边栏菜单）循环的就是这个
    }),
    actions: {
      setRoutes(routes) {
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      // 设置顶部菜单
      setTopbarRoutes(routes) {
        this.topbarRouters = routes
      },
      // 设置侧边栏菜单
      setSidebarRouters(routes) {
        this.sidebarRouters = routes
      },
      //【项目有RBAC权限需要处理】 整理服务器端返回的路由  【核心难点方法！】
      generateRoutes(menuList) {
        // 数据拷贝，防止污染
        const sdata = JSON.parse(JSON.stringify(menuList))
        const rdata = JSON.parse(JSON.stringify(menuList))
        // 默认数据
        const defaultData = JSON.parse(JSON.stringify(menuList))
        // 侧边栏菜单数据
        const sidebarRoutes = filterAsyncRouter(sdata)
        // 重写路由数据（需要挂载的路由实例上的返回的用户的动态路由，核心！）
        const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        // 顶部菜单数据
        const defaultRoutes = filterAsyncRouter(defaultData)
        // 顶部标签页和右上角搜索用的数据
        this.setRoutes(rewriteRoutes)
        // 设置侧边栏菜单数据
        this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
        // 设置给setting组件的数据
        this.setDefaultRoutes(sidebarRoutes)
        // 设置顶部菜单数据
        this.setTopbarRoutes(defaultRoutes)
        // 返回用户的动态路由标识
        return rewriteRoutes
      },
      //【项目没有权限需要处理】 如果项目没有权限处理的必要，则执行这个方法。将动态路由配置给侧边栏菜单，且添加到路由实例中去
      // 注意：
      // 疑惑：可能有疑惑为什么不直接在router/index.js中直接把动态路由挂载进去，非要这里操作。
      // 解答：原因是为了配合框架的侧边栏菜单显示，侧边栏还有头部菜单设置都是在本仓库中完成的，而非读取路由的初始配置信息
      localRoutes() {
        // 顶部标签页和右上角搜索用的数据
        this.setRoutes(dynamicRoutes)
        // 设置侧边栏菜单数据
        this.setSidebarRouters(constantRoutes.concat(dynamicRoutes))
        // 设置给setting组件的数据
        this.setDefaultRoutes(dynamicRoutes)
        // 设置顶部菜单数据
        this.setTopbarRoutes(dynamicRoutes)
        // 返回用户的动态路由标识
        return dynamicRoutes
      }
    }
  })

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  // 遍历筛选返回结果
  return asyncRouterMap.filter(route => {
    // 如果是菜单并且还有子级，筛选子级
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    // 如果有组件，处理组件信息
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        // 根据路径去匹配到对应的组件对象 
        route.component = loadView(route.component)
      }
    }
    //  如果有子级，继续递归处理调用
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}
// 筛选处理子级方法
function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}



// 加载视图的方法
export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
