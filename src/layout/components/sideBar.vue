<template>
  <div class="sidebar-container">
    <!-- <n-scrollbar> -->
    <div class="icon-container">图标</div>
    <n-menu ref="sidebarMenu" v-model:value="activeMenu" :accordion="true" :options="routes">
    </n-menu>
    <!-- </n-scrollbar> -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, Ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { MenuInst } from 'naive-ui'
  import { filterRoutes, generateRoutes } from '@/utils/routes'

  const route = useRoute()
  const router = useRouter()

  const routes = computed(() => {
    const filterRoute = filterRoutes(router.getRoutes())
    return generateRoutes(filterRoute)
  })

  const activeMenu: Ref<string> = ref('')
  const sidebarMenu = ref<MenuInst | null>(null)

  watch(
    route,
    () => {
      const { path } = route
      activeMenu.value = path
      sidebarMenu.value?.showOption(path)
    },
    {
      immediate: true
    }
  )
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  :deep(.n-scrollbar) > .n-scrollbar-rail.n-scrollbar-rail--vertical,
  .n-scrollbar + .n-scrollbar-rail.n-scrollbar-rail--vertical {
    right: 2px;
    .n-scrollbar-rail__scrollbar {
      background-color: azure;
    }
  }
  .sidebar-container {
    background-color: $sideBarBgColor;
    user-select: none;
    color: $textColor;
    user-select: none;
    .icon-container {
      height: 100px;
      padding: 24px;
      text-align: center;
      line-height: 50px;
      font-size: 32px;
    }
  }
  :deep(.n-menu) {
    .n-menu-item {
      .n-menu-item-content {
        .n-menu-item-content__icon {
          color: $sideBarIconColor;
        }
        .n-menu-item-content__arrow {
          color: $textColor;
          font-weight: $fontWeight;
        }
        .n-menu-item-content-header {
          color: $textColor;
          font-size: $sideBarTextSize_1;
          font-weight: $fontWeight;
        }
      }
      .n-menu-item-content:hover::before {
        background-color: $sideBarHoverBgColor;
      }
      .n-menu-item-content.n-menu-item-content--collapsed::before {
        background-color: transparent;
        transition: $sideBarBgTransition;
      }
      .n-menu-item-content.n-menu-item-content--collapsed:hover::before {
        background-color: $sideBarHoverBgColor;
      }
      .n-menu-item-content.n-menu-item-content--child-active {
        .n-menu-item-content-header {
          color: $sideBarActiveTextColor;
          a {
            color: $textColor;
            font-size: $sideBarTextSize_2;
            font-weight: $fontWeight;
          }
        }
        .n-menu-item-content__icon {
          color: $sideBarIconColor;
        }
      }
      .n-menu-item-content.n-menu-item-content--child-active:hover {
        .n-menu-item-content-header {
          color: $sideBarActiveTextColor;
          font-weight: $fontWeight;
        }
        .n-menu-item-content__arrow {
          color: $textColor;
          font-weight: $fontWeight;
        }
      }
      .n-menu-item-content.n-menu-item-content--child-active::before {
        background-color: $sideBarActiveBgColor;
        transition: $sideBarBgTransition;
      }
      .n-menu-item-content.n-menu-item-content--child-active:hover::before {
        background-color: $sideBarActiveBgColor;
      }
      .n-menu-item-content.n-menu-item-content--selected {
        position: relative;
        .n-menu-item-content__icon {
          color: $sideBarIconColor;
        }
        .n-menu-item-content-header {
          a {
            color: $sideBarActiveTextColor;
            font-size: $sideBarTextSize_2;
            font-weight: $fontWeight;
          }
        }
      }
      .n-menu-item-content.n-menu-item-content--selected::before {
        background-color: transparent;
      }

      .n-menu-item-content.n-menu-item-content--selected::after {
        content: '';
        position: absolute;
        width: 60% !important;
        height: 3px;
        left: 60px;
        bottom: 0;
        background-color: $sideBarAfterBgColor;
        transition: $sideBarAfterTransition;
      }
    }
    .n-submenu-children {
      .n-menu-item {
        .n-menu-item-content.n-menu-item-content--selected {
          .n-menu-item-content-header {
            a {
              color: $sideBarActiveTextColor;
              font-size: $sideBarTextSize_2;
              font-weight: $fontWeight;
            }
          }
        }
        .n-menu-item-content:hover::before {
          background-color: transparent;
        }
        .n-menu-item-content {
          .n-menu-item-content-header {
            a {
              color: $textColor;
              font-size: $sideBarTextSize_2;
              font-weight: $fontWeight;
            }
          }
        }
        .n-menu-item-content::after {
          content: '';
          position: absolute;
          width: 00%;
          height: 3px;
          left: 60px;
          bottom: 0;
          background-color: $sideBarAfterBgColor;
          transition: $sideBarAfterTransition;
        }
        .n-menu-item-content:hover::after {
          width: 60%;
          transition: $sideBarAfterTransition;
        }
      }
    }
  }
</style>
