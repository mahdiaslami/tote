<template>
  <navbar />

  <sidebar />

  <!-- <Todo /> -->
  <group />

  <reload-prompt />
</template>

<script setup>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ReloadPrompt from '@/components/ReloadPrompt'
import Todo from '@/pages/Todo'
import Group from '@/pages/Group'
</script>
