import router from './router'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { isHttp } from '@/utils/validate'
import { isRelogin } from '@/utils/request'
import useUserStore from '@/store/modules/user'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect'];
// TODO 导航守卫逻辑，可以根据自己的项目需求修改，不建议随便改
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const { token , nickname } = useUserStore()
    // 是否有token
  if (token) {
    // 有token,说明登录了
    // 设置标题
    to.meta.title && useSettingsStore().setTitle(to.meta.title)
    if (to.path === '/login') {
      // 登录了还去登录页，跳转到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      // 登录了，去非登录页，放行
      // 用户资料是否存在，不存在获取一下,
      // TODO 将来这里不一定是通过name来进行判断
      if (!nickname) {
        isRelogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        try {
          // // 1、获取用户资料 【有权限需要处理】
          // let { roles } = await useUserStore().getInfo()
          // // 2 如果项目中有权限处理要处理执行  【服务器端返回动态路由实例】
          // let accessRoutes = await usePermissionStore().generateRoutes(roles.menuList)

          // 1、获取用户资料 【没有权限需要处理】
          await useUserStore().getUserInfo()
          // 2、 如果项目没有权限要处理  【没有权限需要处理，本地配置路由】
          const accessRoutes = await usePermissionStore().localRoutes()

          // ================无论是本地配置还是服务器端返回都要动态路由都要添加到路由实例中去==================
          // 3、添加到路由实例中去，由于vue-router4已经抛弃了addRoutes方法，现在需要使用addRoute方法
          accessRoutes.forEach(route => {
            router.addRoute(route) // 动态添加可访问路由表
          })
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        } catch (error) {
          console.log(error);
          // 拉取用户资料失败，退出
          useUserStore().logout()
          ElMessage.error(error)
        }
      } else {
        // 已经有了用户资料放行
        next()
      }
    }
  } else {
    // 没有token，没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
