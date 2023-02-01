<template>
  <div class="tag-wrapper">
    <n-tag
      v-for="(tag, index) in App.tagsViewList"
      :key="tag.fullPath"
      class="mx-1"
      :closable="!isActive(tag.fullPath)"
      :class="{ active: isActive(tag.fullPath) }"
      :bordered="false"
      @close="onCloseClick(index)"
    >
      <router-link :to="{ path: tag.fullPath }">
        {{ tag.title }}
      </router-link>
    </n-tag>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'
  import { useStore } from '@/store/index'

  const route = useRoute()
  const isActive = (path: string) => {
    return route.path === path
  }
  const { App } = useStore()
  const onCloseClick = (index: number) => {
    App.removeTagsView({
      type: 'index',
      index
    })
  }
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  .tag-wrapper {
    min-height: $tagHeight;
    line-height: $tagHeight;
    padding: 0 10px 0 20px;
    background-color: $tagBackground;

    .n-tag {
      text-align: center;
      position: relative;
      margin-right: 10px;
      background-color: $tagItemBackground;
      color: $tagTextColor;
      border: none !important;
      font-size: 14px;
      justify-content: center;
      user-select: none;

      :deep(.n-base-close) {
        color: $tagCloseTextColor;
        background-color: $tagCloseBackground;
        &:hover {
          background-color: $tagCloseHoverBackground !important;
          color: $tagCloseHoverTextColor;
        }
      }
      &::after {
        content: '';
        position: absolute;
        width: 00%;
        height: $tagAfterHeight;
        bottom: 0;
        left: $tagAfterLeft;
        right: $tagAfterRight;
        background-color: $tagAfterBackground;
        transition: $tagAfterTransition;
        z-index: 100;
      }
      &:hover::after {
        width: 100%;
      }
    }
    .n-tag.active {
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: $tagAfterHeight;
        bottom: 0;
        background-color: ¥tagAfterBackground;
        transition: $tagAfterTransition;
        z-index: 100;
      }
    }
  }
</style>
