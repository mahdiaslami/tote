<script setup lang="ts">

withDefaults(defineProps<{
  cancelable: boolean
}>(), { cancelable: true })

defineOptions({
  inheritAttrs: false
})

const model = defineModel<boolean>({ default: false })

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
    <!-- TODO: should i add bg-black/5 to palette -->
    <Transition name="modal">
      <div v-if="model"
        class="fixed top-0 h-full w-full z-10 bg-black/5"
        @click="model = !cancelable">

        <div class="bg-secondary w-11/12 absolute bottom-4 left-1/2 -translate-x-1/2
          rounded-3xl shadow"
          v-bind="$attrs"
          @click="ev => ev.stopPropagation()">
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-enter-active,
.modal-leave-active,
.modal-leave-active>div,
.modal-enter-active>div {
  /* TODO: use variable for all ease function animations */
  transition-property: opacity, bottom;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from>div,
.modal-leave-to>div {
  bottom: 0px !important;
}
</style>