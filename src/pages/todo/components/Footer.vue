<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import OptionsIcon from '@/components/icons/OptionsIcon.vue'
import KeyboardIcon from '@/components/icons/KeyboardIcon.vue'
import AppTextArea from '@/components/TextArea.vue'
import { useKeyboard, useKeyboardEventListener } from '@/composable/keyboard'
import { nextTick, ref } from 'vue'
import { textChangeRangeIsUnchanged } from 'typescript'

const keyboard = useKeyboard()

const content = defineModel<string>('content', { required: true })
const options = defineModel<boolean>('options', { required: true })

const textArea = ref<any | null>(null)

const emit = defineEmits(['save'])

defineExpose({
  insertText: insertTextAndPreserveCursor
})

function insertTextAndPreserveCursor(txt: string) {
  const selection = window.getSelection()
  if (selection && selection.rangeCount && content.value && content.value.length > 0) {
    let range = selection.getRangeAt(0)

    const prefix = content.value.slice(0, range.startOffset)
    const suffix = content.value.slice(range.endOffset, content.value.length)

    // logically each emoji is 2 or more character, but cursor assume
    // it is one character.
    const cursorOffset = prefix.replace(/\p{Emoji_Presentation}/ug, 'e').length

    content.value = prefix + txt + suffix

    nextTick(() => {
      for (let i = 0; i <= cursorOffset; i++) {
        selection.modify('move', 'forward', 'character')
      }
    })
  } else {
    content.value += txt
  }
}

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
  } else {
    document.body.style.height = `100%`
  }
})

useKeyboardEventListener('keyboardWillShow', 'options', () => {
  options.value = true
  document.body.style.height = `${keyboard.screenHeight}px`
})

</script>

<template>
  <div class="relative flex flex-row items-end bg-primary border-t border-line/20">
    <button class="flex items-center justify-center w-14 h-12 select-none"
      @mousedown.prevent="toggleOptionsKeyboard"
      @touchstart.prevent="toggleOptionsKeyboard">
      <Transition name="keyboard-options"
        mode="out-in">
        <KeyboardIcon v-if="!keyboard.showing && options"
          class="h-7 w-7 fill-pen/40 stroke-pen/40" />
        <OptionsIcon v-else
          class="h-7 w-7 stroke-pen/40" />
      </Transition>
    </button>

    <AppTextArea ref="textArea"
      v-model="content"
      class="w-full px-3 pt-2.5 pb-3.5 font-normal min-h-12 text-base max-h-36 overflow-y-auto"
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