<template>
  <div class="app-wrapper">
    <SideBar class="sideBar-container"></SideBar>
    <div class="app-container">
      <div class="fixed-header">
        <NavBar></NavBar>
      </div>
      <AppMain class="main-container"></AppMain>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import SideBar from './components/sideBar.vue'
  import NavBar from './components/navBar.vue'
  import AppMain from './components/appMain.vue'
  import { useWindow } from '@/hooks/core/UseWindow'
  import { useStore } from '@/store'
  useWindow()
</script>

<style lang="scss" scoped>
  @import '@/style/variables.scss';
  .app-wrapper {
    width: 100%;
    height: 100%;
    color: $appMainTextColor;

    .sideBar-container {
      float: left;
      width: $sideBarWidth;
      height: 100%;
    }
    .app-container {
      float: right;
      width: calc(100% - #{$sideBarWidth});
      height: 100%;
      display: flex;
      flex-direction: column;

      .fixed-header {
        width: 100%;
        max-height: $navBarHeight + $tagHeight;
      }

      .main-container {
        width: 100%;
        background-color: $appMainBackground;
        flex: 1;
      }
    }
  }
</style>
