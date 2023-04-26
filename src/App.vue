<script setup>
import TheConfirm from '@/components/TheConfirm.vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import ReloadPrompt from '@/components/ReloadPrompt.vue'

</script>

<template>
  <the-navbar />
  <the-sidebar />

  <router-view />

  <reload-prompt />
  <the-confirm />
</template>
