<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import SentimentSatisfiedIcon from '@/components/icons/SentimentSatisfiedIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import { ref } from 'vue';

const content = defineModel<string>('content', { required: true })
const emoji = defineModel<boolean>('emoji')

const emit = defineEmits(['save'])

</script>

<template>
  <div class="relative flex flex-row items-end bg-secondary border-t border-line">
    <button class="flex items-center justify-center w-14 h-12 select-none"
      @click="emoji = !emoji">
      <SentimentSatisfiedIcon class="h-7 w-7 fill-mute" />
    </button>

    <AppTextArea v-model="content"
      class="w-full px-3 pt-2.5 pb-3.5 font-light min-h-12 text-base"
      placeholder="کار من"
      @keyup.enter="emit('save')" />

    <button class="flex items-center justify-center w-14 h-12 select-none"
      @click="emit('save')">
      <SaveIcon class="h-7 w-7 fill-mute" />
    </button>
  </div>
</template>