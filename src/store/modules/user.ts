import { defineStore } from 'pinia'
import router from '@/router'
import md5 from 'md5'

import { getUserInfo, login } from '@/api/auth'
import { TOKEN } from '@/constants'
import { getItem, setItem, clear } from '@/utils/storage'
import { setLoginTime } from '@/utils/auth'

// import type { AdminUserInfo } from '../types/admin'
import { User } from '/#/service-type'

interface UserStoreState {
  token: string
  userInfo: Partial<User>
}

export default defineStore('User', {
  state(): UserStoreState {
    return {
      token: getItem(TOKEN) || '',
      userInfo: {}
    }
  },
  actions: {
    /**
     * 封装登录请求动作
     */
    login(authInfo: BasePasswordLoginQuery) {
      const { account, password, verifyCode } = authInfo
      // 返回promise对象
      return new Promise(async (resolve, reject) => {
        const { status, token, user } = await login({
          account,
          password,
          verifyCode
        })
        if (status === 200) {
          this.token = token
          setItem(TOKEN, token)
          setLoginTime()
          this.userInfo = user
          resolve(() => {
            return
          })
        }
      })
    },
    /**
     * 获取用户信息请求动作
     */
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data
      return data
    },
    /**
     * 退出登录
     */
    loginOut() {
      this.token = ''
      this.userInfo = {}
      clear()
      window.$message.success('退出登陆成功')
      router.push({ path: '/login' })
    }
  },
  getters: {
    avatarUserInfo: (state) => {
      return state.userInfo.username || ''
    },
    hasUserInfo: (state) => {
      return JSON.stringify(state.userInfo) !== '{}'
    }
  }
})
