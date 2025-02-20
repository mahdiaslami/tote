<script setup lang="ts">
import type { Todo } from '@/types'
import PannableTodo from '@/components/PannableTodo.vue'
import { ref } from 'vue'

const div = ref<HTMLDivElement | null>(null)
const lastElementChild = ref<HTMLDivElement | null>(null)

const emit = defineEmits(['edit', 'delete', 'click', 'tick'])

withDefaults(defineProps<{
  list: Todo[],
  animate: boolean,
}>(), { animate: true })

defineExpose({
  scrollToEnd() {
    if (lastElementChild.value) {
      lastElementChild.value.scrollIntoView(false)
    }
  }
})

function handleBeforeLeave(el: any) {
  el.style.height = `${el.clientHeight}px`
}

</script>

<template>
  <div ref="div"
    class="paper-4 pt-5 scroll-smooth shadow-inner">
    <TransitionGroup name="todo"
      :duration="animate ? 300 : 1"
      @before-leave="handleBeforeLeave">
      <PannableTodo v-for="todo in list"
        :key="todo.id"
        class="py-3 w-full overflow-hidden"
        :todo="todo"
        @edit="emit('edit', todo)"
        @delete="emit('delete', todo)"
        @tick="emit('tick', todo)" />
    </TransitionGroup>
    <div ref="lastElementChild"
      class="pt-12" />
  </div>
</template>

<style>
.todo-enter-active,
.todo-leave-active {
  transition-property: opacity, height, padding;
  transition-duration: 300ms;
  transition-timing-function: ease-out;
}

.todo-enter-from,
.todo-leave-to {
  opacity: 0 !important;
  height: 0 !important;
  padding: 0 !important;
}

/** ------------------------------------------- */

.paper-1 {
  background:
    linear-gradient(#00000000, #00000000 23px, rgb(238 238 221) 24px, rgb(238 238 221) 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75)),
    url("@/assets/pattern-2.png") left top repeat,
    linear-gradient(to bottom left, rgb(127 127 255 / 0.3), rgb(245 249 252 / 0.8)),
    linear-gradient(to bottom right, rgb(5 150 105 / 0.3), rgb(245 249 252 / 0.8));
  background-attachment: local, local, local, local, local;
}

.paper-2 {
  background:
    linear-gradient(#00000000, #00000000 23px, #CDDCFF 24px, #CDDCFF 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    url("@/assets/pattern-3.png") left top repeat,
    linear-gradient(135deg, #EBFFFA 0%, #DEF0FF 70%, #F5FAFF 100%);
  background-attachment: local, local, scroll;
}
/* New papers with theme colors */
.paper-3 {
  background:
    linear-gradient(#00000000, #00000000 23px, theme('colors.sky.300') 24px, theme('colors.sky.300') 24px, #00000000 25px) center top / 100% 24px repeat-y,
    linear-gradient(135deg, theme('colors.sky.50') 0%, theme('colors.sky.100') 70%, theme('colors.sky.100') 100%);
  background-attachment: local, local, scroll;
}

.paper-4 {
  background:
    linear-gradient(#00000000, #00000000 23px, theme('colors.emerald.300') 24px, theme('colors.emerald.300') 24px, #00000000 25px) center top / 100% 24px repeat-y,
    linear-gradient(135deg, theme('colors.emerald.50') 0%, theme('colors.emerald.100') 70%, theme('colors.emerald.100') 100%);
  background-attachment: local, local, scroll;
}

</style>