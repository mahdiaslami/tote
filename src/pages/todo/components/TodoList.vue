<script setup lang="ts">
import type { Todo } from '@/types'
import PannableTodo from '@/components/PannableTodo.vue'

const emit = defineEmits(['edit', 'delete', 'click'])

withDefaults(defineProps<{
  list: Todo[],
  animate: boolean,
}>(), { animate: true })

function handleBeforeLeave(el: any) {
  el.style.height = `${el.clientHeight}px`
}

</script>

<template>
  <TransitionGroup name="fade-collapse"
    :duration="animate ? 500 : 1"
    @before-leave="handleBeforeLeave"
    tag="div"
    class="paper pt-4.5 pb-9">
    <PannableTodo v-for="todo in list"
      class="py-3 w-full"
      :key="todo.id"
      :todo="todo"
      @edit="emit('edit', todo)"
      @delete="emit('delete', todo)"
      @click="emit('click', todo)" />
  </TransitionGroup>
</template>

<style>
.paper {
  background:
    linear-gradient(#00000000, #00000000 23px, rgb(var(--color-line)) 24px, rgb(var(--color-line)) 24px, #00000000 25px) center top / calc(100% - 64px) 24px repeat-y,
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.75)),
    url("@/assets/pattern.png") left top repeat,
    linear-gradient(to bottom left, rgb(var(--color-info) / 0.3), rgb(var(--color-primary) / 0.8)),
    linear-gradient(to bottom right, rgb(var(--color-success) / 0.3), rgb(var(--color-primary) / 0.8));
  background-attachment: local, local, local, local, local;
}

.fade-collapse-enter-active,
.fade-collapse-leave-active {
  transition-property: opacity, height, padding;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-collapse-enter-from,
.fade-collapse-leave-to {
  opacity: 0 !important;
  height: 0 !important;
  padding: 0 !important;
}
</style>