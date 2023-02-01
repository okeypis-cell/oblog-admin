// export interface BackStage {

import { LocationQuery, RouteMeta, RouteParams, RouteRecordName } from 'vue-router'

// }

export interface AdminUserInfo {
  role?: []
  _id?: string
  id?: string
  username?: string
  title?: string
  avatar?: string
  permission?: []
}

export interface AdminTagsView {
  fullPath?: string
  name?: RouteRecordName
  meta?: RouteMeta
  params?: RouteParams
  path?: string
  query?: LocationQuery
  title?: string
}
