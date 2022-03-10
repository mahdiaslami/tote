<template>
  <the-navbar />
  <the-sidebar />

  <router-view />

  <reload-prompt />
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'
import ReloadPrompt from '@/components/ReloadPrompt'
</script>
