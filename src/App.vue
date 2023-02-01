<template>
  <n-message-provider>
    <n-config-provider :inline-theme-disabled="true">
      <router-view></router-view>
    </n-config-provider>
  </n-message-provider>
</template>

<script lang="ts" setup>
  import { useWow } from '@/hooks/core/UseWow'
  useWow()
</script>

<style lang="scss" scoped>
  .n-config-provider {
    height: 100%;
    width: 100%;
  }
</style>
