<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
import KeyboardIcon from '@/components/icons/KeyboardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import { useKeyboard, useKeyboardEventListener } from '@/composable/keyboard'
import { ref } from 'vue'

const keyboard = useKeyboard()

const content = defineModel<string>('content', { required: true })
const options = defineModel<boolean>('options', { required: true })

const textArea = ref<any | null>(null)

const emit = defineEmits(['save'])

defineExpose({
  insertText: (text: string) => textArea.value?.insertText(text),
  removeText: () => textArea.value?.removeText(),
})

function save() {
  emit('save')
}


let manuallyHideKeyboard = false
function toggleOptionsKeyboard() {
  if (keyboard.showing) {
    if (options.value) {
      manuallyHideKeyboard = true
      keyboard.hide()
    } else {
      // undefined state
    }
  } else {
    if (options.value) {
      // unfortunately the `keyboard.show()` has delay, i have to remove focus
      // to let `textArea.value?.focus()` work and show keyboard
      textArea.value?.blur()
      textArea.value?.focus()

    } else {
      options.value = true
    }
  }
}

useKeyboardEventListener('keyboardWillHide', 'options', () => {
  if (!manuallyHideKeyboard) {
    options.value = false
  }
})

useKeyboardEventListener('keyboardDidHide', 'options', () => {
  if (manuallyHideKeyboard) {
    manuallyHideKeyboard = false
  }
})

useKeyboardEventListener('keyboardWillShow', 'options', () => {
  options.value = true
})

</script>

<template>
  <div class="relative flex flex-row items-end bg-white">
    <button class="flex items-center justify-center w-14 h-12 select-none"
      @mousedown.prevent="toggleOptionsKeyboard"
      @touchstart.prevent="toggleOptionsKeyboard">
      <Transition name="keyboard-options"
        mode="out-in">
        <KeyboardIcon v-if="!keyboard.showing && options"
          class="h-7 w-7 fill-slate-400 stroke-slate-400" />
        <OptionsIcon v-else
          class="h-7 w-7 stroke-slate-400" />
      </Transition>
    </button>

    <AppTextArea ref="textArea"
      v-model="content"
      class="w-full px-3 pt-3 pb-2.5 font-normal min-h-12 text-base/normal
        max-h-36 overflow-y-auto"
      placeholder="کار من"
      @keyup.enter="save" />

    <button class="flex items-center justify-center w-14 h-12 select-none"
      @touchstart.prevent="save"
      @mousedown.prevent="save">
      <SaveIcon class="h-7 w-7" />
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