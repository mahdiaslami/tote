<script setup lang="ts">
import ArrowUpwardIcon from '@/components/icons/ArrowUpwardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'

const content = defineModel<string>('content', { required: true })
const emit = defineEmits(['save'])

</script>

<template>
  <div class="relative flex flex-row items-end bg-secondary">
    <AppTextArea v-model="content"
      class="w-full h-auto p-3 font-light min-h-12 text-lg"
      placeholder="کار من"
      @keyup.enter="emit('save')" />

    <button class="flex items-center justify-center w-14 h-13 select-none"
      @click="emit('save')">
      <ArrowUpwardIcon class="text-2xl font-thin text-mute" />
    </button>
  </div>
</template>