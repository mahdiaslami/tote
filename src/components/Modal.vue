<script setup lang="ts">
import { useBackEventListener } from '@/composable/backbutton'

withDefaults(defineProps<{
  cancelable: boolean
}>(), { cancelable: true })

defineOptions({
  inheritAttrs: false
})

const model = defineModel<boolean>({ default: false })

useBackEventListener('modal', () => {
  if (model.value) {
    model.value = false
    return false
  }

  return true
})

// TODO(ios): As the ios doesn't have transparent status bar we have to change it mannually
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

        <div class="bg-secondary w-11/12 absolute bottom-4 left-1/2 -translate-x-1/2
          rounded-3xl shadow max-w-md"
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
  transition-duration: 400ms, 350ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-enter-active,
.modal-enter-active>div {
  /* TODO: use variable for all ease function animations */
  transition-property: opacity, bottom;
  transition-duration: 400ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
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