import router from '@/router'
import pinia, { useStore } from '@/store'
import { WHITE_LIST } from '@/constants'

// 不重定向白名单
const whiteList = WHITE_LIST

router.beforeEach(async (to, from, next) => {
  const { User } = useStore()
  console.log('User.token', User.token)
  if (User.token && whiteList.indexOf(to.path) < 0) {
    if (!User.hasUserInfo) {
      console.log('getUserInfo')
      User.getUserInfo()
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else if (!to.meta.isLogin) {
    next()
  } else {
    next('/login')
  }
})
