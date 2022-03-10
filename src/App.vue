<template>
  <navbar />

  <sidebar />

  <todo-list />
  <!-- <group /> -->

  <reload-prompt />
</template>

<script setup>
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import ReloadPrompt from '@/components/ReloadPrompt'
import TodoList from '@/pages/todos/TodoList'
import Group from '@/pages/Group'
</script>
