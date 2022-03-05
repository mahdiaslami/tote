<template>
  <navbar />

  <sidebar />

  <Todo />

  <reload-prompt />
</template>

<script setup>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ReloadPrompt from '@/components/ReloadPrompt'
import Todo from '@/pages/Todo'
</script>
