<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import ContentMenuIcon from '@/components/icons/ContentMenuIcon.vue'
import AppTextArea from '@/components/TextArea.vue'

const content = defineModel<string>('content', { required: true })
const emoji = defineModel<boolean>('emoji')

const emit = defineEmits(['save'])

function save() {
  emit('save')
}

</script>

<template>
  <div class="relative flex flex-row items-end bg-secondary border-t border-line">
    <button class="flex items-center justify-center w-14 h-12 select-none"
      @mousedown.prevent="emoji = !emoji"
      @touchstart.prevent="emoji = !emoji">
      <ContentMenuIcon class="h-7 w-7 fill-pen/40" />
    </button>

    <AppTextArea v-model="content"
      class="w-full px-3 pt-2.5 pb-3.5 font-light min-h-12 text-base"
      placeholder="کار من"
      @keyup.enter="save" />

    <button class="flex items-center justify-center w-14 h-12 select-none"
      @touchstart.prevent="save"
      @mousedown.prevent="save">
      <SaveIcon class="h-7 w-7 fill-pen/40" />
    </button>
  </div>
</template>