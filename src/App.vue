<script setup lang="ts">
//
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="app-init">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.app-init-enter-active {
  transition-property: opacity;
  transition-duration: 500ms;
}

.app-init-enter-from {
  opacity: 0;
}
</style>