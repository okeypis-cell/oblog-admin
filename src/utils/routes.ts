import path from 'path-browserify'
import { Component } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { PersonOutline as PersonIcon } from '@vicons/ionicons5'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const filterRoutes = (routes: any[]) => {
  const childrenRoutes: any[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      childrenRoutes.push(...route.children)
    }
  })
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

function isNull(data: any) {
  if (!data) return false
  if (JSON.stringify(data) === '{}') return false
  if (JSON.stringify(data) === '[]') return false
  return true
}
// !为空
export const generateRoutes = (routes: any[]) => {
  const result: any[] = []
  routes.forEach((route) => {
    const routePath = route.path
    if (!isNull(route.children) && !isNull(route.meta)) return
    if (isNull(route.children) && !isNull(route.meta)) {
      result.push(...generateRoutes(route.children))
      return
    }
    let data = result.find((route) => route.key === routePath)
    if (!data) {
      data = {
        meta: route.meta,
        key: routePath
      }
      if (data.meta.icon) {
        data.icon = renderIcon(PersonIcon)
      }
      if (isNull(route.children)) {
        data.children = []
      }
      if (!isNull(route.children) && data.meta.sidebar) {
        if (data.meta.title) {
          data.label = () =>
            h(RouterLink, { to: { path: routePath } }, { default: () => data.meta.title })
        }
      } else if (data.meta.title) {
        data.label = data.meta.title
      }
      if (data.meta.sidebar) {
        result.push(data)
      }
    }
    if (isNull(route.children) && isNull(route.meta)) {
      data.children.push(...generateRoutes(route.children))
    }
  })
  return result
}
