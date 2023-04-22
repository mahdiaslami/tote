<template>
  <button
    class="b-0 rounded-full cursor-pointer p-2.5 bg-secondary px-3.5
      hover:bg-pri text-ternary shadow font-medium"
    @click="handleClick"
  >
    <menu-icon class="text-2xl" />
  </button>
</template>

<script setup>
import MenuIcon from '@/components/icons/MenuIcon'

const emit = defineEmits(['click'])

function handleClick(e) {
  emit('click', e)
}
</script>
