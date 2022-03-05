<template>
  <div
    v-show="isOpen"
    class="fixed inset-y-0 right-0 w-48 shadow
    backdrop-blur flex flex-col justify-end"
  >
    <button class="p-2 ml-2 mb-2 rounded-l-full bg-green-300">
      گروه ها
    </button>
    <button
      class="p-2 ml-2 mb-2 rounded-l-full bg-yellow-500
      text-white"
      @click="close"
    >
      بستن
    </button>
  </div>
</template>

<script setup>
import { useSidebar } from '@/hooks/useSidebar'

const { isOpen, close } = useSidebar()

</script>
