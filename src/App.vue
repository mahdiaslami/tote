<template>
  <the-navbar />
  <the-sidebar />

  <router-view />

  <reload-prompt />
  <the-confirm />
</template>

<script setup>
import TheConfirm from '@/components/TheConfirm'
import TheNavbar from '@/components/TheNavbar'
import TheSidebar from '@/components/TheSidebar'
import ReloadPrompt from '@/components/ReloadPrompt'

</script>
