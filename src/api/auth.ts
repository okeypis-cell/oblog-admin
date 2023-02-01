import service from '@/utils/request'
import { User } from '/#/service-type'

declare global {
  interface BasePasswordLoginQuery {
    account: string
    password: string
    verifyCode?: string
  }
  interface BaseLoginResponse extends BaseResponse {
    token: string
    user: User
  }
}
/**
 * 接口请求模块
 */
export const login = (data: BasePasswordLoginQuery) => {
  return service.request<BaseLoginResponse>({
    url: '/api/auth/loginByPassword',
    method: 'POST',
    data
  })
}
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return service.getWithData<User>({
    url: '/api/user/info',
    method: 'GET'
  })
}
