<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  import { watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '@/store'
  import type { RouteLocationNormalizedLoaded } from 'vue-router'

  import { isTags } from '@/utils/tags'

  const routes = useRoute()
  const { App } = useStore()

  const getTitle = (route: RouteLocationNormalizedLoaded): string => {
    let title = ''
    if (!route.meta) {
      const pathArr = route.path.split('/')
      title = pathArr[pathArr.length - 1]
    } else {
      title = route.meta.title
    }
    return title
  }

  watch(
    routes,
    (to, from) => {
      if (!isTags(to.path)) return

      const { fullPath, meta, params, path } = to
      App.addTagsViewList({
        path,
        fullPath,
        meta,
        params,
        title: getTitle(to)
      })
    },
    {
      immediate: true
    }
  )
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  .app-main {
    width: 100%;
    height: calc(100vh - $navBarHeight);
    position: relative;
    overflow: hidden;
    padding: 0.61rem 0.2rem 0.2rem 0.2rem;
    box-sizing: border-box;
  }
</style>
