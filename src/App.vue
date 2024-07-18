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
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.app-init-enter-from {
  opacity: 0;
}
</style>