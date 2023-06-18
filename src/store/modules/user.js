import { loginApi, getUserInfoApi } from '@/api/user'
import { getToken, setToken, delToken } from '@/utils/auth'
import router from '../../router'
import { ref,computed } from 'vue'

const useUserStore = defineStore('user', () => {
  // 定义token
  const token = ref(getToken())
  // 定义用户信息
  const userInfo = ref({})
  // 定义用户名和头像计算属性
  const nickname = computed(()=> userInfo.value.nick_name)
  const avatar = computed(()=> userInfo.value.avatar_url)
  // 登录
  const login = async (data) => {
    token.value = await loginApi(data)
    setToken(token.value)
  }
  // 获取用户信息
  const getUserInfo = async () => {
    userInfo.value = await getUserInfoApi()
    return userInfo.value
  }
  // 退出
  const logout = () => {
    token.value = ''
    userInfo.value = {}
    delToken()
    router.push('/login')
  }

  return {
    token,
    userInfo,
    nickname,
    avatar,
    login,
    logout,
    getUserInfo
  }
})

export default useUserStore
