// store/index.ts
import { createPinia } from 'pinia'

import UserStore from './modules/user'
import AppStore from './modules/app'

export function useStore() {
  return {
    User: UserStore(),
    App: AppStore()
  }
}

const pinia = createPinia()
export default pinia
