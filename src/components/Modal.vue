<script setup lang="ts">
import { useBackEventListener } from '@/composable/backbutton'
import { useKeyboard } from '@/composable/keyboard'
import { computed } from 'vue'

withDefaults(defineProps<{
  cancelable: boolean
}>(), { cancelable: true })

defineOptions({
  inheritAttrs: false
})

const keyboard = useKeyboard()

const model = defineModel<boolean>({ default: false })

useBackEventListener('modal', () => {
  if (model.value) {
    model.value = false
    return false
  }

  return true
})

const style = computed(() => {
  const spacing4 = 16
  let result = spacing4+'px'

  if (keyboard.shown) {
    result = `${keyboard.keyboardHeight + spacing4}px`
  }

  return {
    'bottom': result
  }
})

// TODO(ios): As the ios doesn't have transparent status bar we have to change
// it mannually
// watch(model, () => {
//   if (model.value) {
//     StatusBar.setBackgroundColor({ color: '#f2f2f2' })
//   } else {
//     StatusBar.setBackgroundColor({ color: '#ffffff' })
//   }
// })

</script>

<template>
  <Teleport to="body">
    <Transition name="modal"
      :duration="400">
      <div v-if="model"
        class="fixed top-0 h-full w-full z-10 bg-black/10"
        @click="model = !cancelable">
        <div class="bg-white w-11/12 absolute left-1/2 -translate-x-1/2
          rounded-3xl shadow max-w-md"
          :style="style"
          v-bind="$attrs"
          @click="ev => ev.stopPropagation()">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-leave-active,
.modal-leave-active>div {
  transition-property: opacity, bottom;
  transition-duration: 200ms, 150ms;
  transition-timing-function: ease-out;
}

.modal-enter-active,
.modal-enter-active>div {
  /* TODO: use variable for all ease function animations */
  transition-property: opacity, bottom;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from>div,
.modal-leave-to>div {
  opacity: 0;
  bottom: -100px !important;
}
</style>