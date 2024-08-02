<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
import KeyboardIcon from '@/components/icons/KeyboardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'

defineProps<{ keyboardIcon: boolean }>()

const content = defineModel<string>('content', { required: true })

const emit = defineEmits(['save', 'optionsPress'])

function save() {
  emit('save')
}

</script>

<template>
  <div class="relative flex flex-row items-end bg-primary border-t border-line/20">
    <button class="flex items-center justify-center w-14 h-12 select-none"
      @mousedown.prevent="emit('optionsPress')"
      @touchstart.prevent="emit('optionsPress')">
      <Transition name="keyboard-options"
        mode="out-in">
        <KeyboardIcon v-if="keyboardIcon"
          class="h-7 w-7 text-pen/40" />
        <OptionsIcon v-else
          class="h-7 w-7 text-pen/40" />
      </Transition>
    </button>

    <AppTextArea v-model="content"
      class="w-full px-3 pt-2.5 pb-3.5 font-light min-h-12 text-base max-h-36 overflow-y-auto"
      placeholder="کار من"
      @keyup.enter="save" />

    <button class="flex items-center justify-center w-14 h-12 select-none"
      @touchstart.prevent="save"
      @mousedown.prevent="save">
      <SaveIcon class="h-7 w-7 fill-pen/40" />
    </button>
  </div>
</template>

<style>
.keyboard-options-enter-active,
.keyboard-options-leave-active {
  transition: transform 100ms ease-in-out;
}

.keyboard-options-enter-from,
.keyboard-options-leave-to {
  transform: scale(0);
}
</style>