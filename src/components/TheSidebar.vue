<template>
  <div
    v-show="isOpen"
    class="fixed inset-y-0 right-0 w-48 shadow-lg
    backdrop-blur flex flex-col justify-end text-center"
  >
    <router-link
      :to="{ name: 'GroupList' }"
      class="p-2 ml-2 mb-2 rounded-l-full bg-green-300"
      @click="close"
    >
      گروه ها
    </router-link>
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
import { ref } from 'vue'
import { useSidebar } from '@/hooks/useSidebar'

const users = ref([])

const { isOpen, close } = useSidebar()

</script>
