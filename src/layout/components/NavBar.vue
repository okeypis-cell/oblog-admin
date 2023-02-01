<template>
  <div class="navBar">
    <div class="right-menu">
      <n-dropdown class="avatar-wrapper" trigger="click" :show-arrow="true" :options="dropList">
        <div class="avatar-container">
          <n-avatar
            size="large"
            :src="User.avatarUserInfo"
            fallback-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          />
        </div>
      </n-dropdown>
    </div>
    <div class="left-menu">
      <n-breadcrumb class="breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <n-breadcrumb-item v-for="(item, index) in breadcrumbData" :key="item.path">
            <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
              item.meta.title
            }}</span>
            <router-link v-else class="redirect" :to="item.path">{{ item.meta.title }}</router-link>
          </n-breadcrumb-item>
        </transition-group>
      </n-breadcrumb>
    </div>
  </div>
  <Tags></Tags>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from '@/store'

  // import Tags from './tags.vue'

  const route = useRoute()
  const router = useRouter()
  const { User } = useStore()

  const handleLoginOut = () => {
    User.loginOut()
  }

  const breadcrumbData = ref([])
  const getBreadcrumbData = () => {
    breadcrumbData.value = route.matched.filter((item) => item.meta.sidebar)
  }

  const dropList = [
    {
      label: '首页',
      props: {
        onClick: () => {
          router.push({ path: '/' })
        }
      }
    },
    {
      type: 'divider'
    },
    {
      label: '退出',
      props: {
        onClick: () => {
          handleLoginOut()
        }
      }
    }
  ]

  watch(
    route,
    () => {
      getBreadcrumbData()
    },
    {
      immediate: true
    }
  )
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  .navBar {
    min-height: $navBarHeight;
    overflow: hidden;
    position: relative;
    padding: 0 10px 0 40px;
    background-color: $navBarBackground;
    user-select: none;

    .right-menu {
      display: flex;
      align-items: center;
      float: right;

      .avatar-container {
        margin: $navBarPadding;
        position: relative;
        height: $navBarAvatarHeight;
      }
    }

    .left-menu {
      height: $navBarAvatarHeight;
      display: flex;
      align-items: center;
      float: left;
      margin: $navBarPadding 0;

      :deep(.n-breadcrumb-item) {
        color: $textColor;

        .n-breadcrumb-item__link {
          .no-redirect {
            color: $textColor;
            transition: all 0.5s;
            font-size: $navBarNoRedirectSize;
          }
          .redirect:hover {
            color: $navBarRedirectHoverTextColor;
            transition: all 0.5s;
            font-size: $navBarNoRedirectSize;
          }
          .redirect {
            transition: all 0.5s;
            color: $navBarRedirectTextColor;
            font-size: $navBarRedirectSize;
          }
        }
        .n-breadcrumb-item__link:hover {
          background-color: transparent;
        }
      }
    }
  }
  // 面包屑动画
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all 0.5s;
  }
  .breadcrumb-enter-from {
    opacity: 0;
    // position: absolute;
    // left: 100px;
    transform: translateX(15px);
  }
  .breadcrumb-leave-active {
    display: none;
  }
  .breadcrumb-leave-active {
    position: absolute;
  }
</style>
