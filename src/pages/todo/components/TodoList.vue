<script setup lang="ts">
import { useTodoStore } from '@/store/todo'
import Todo from '@/components/PannableTodo.vue'
import { ref } from 'vue';

const todoStore = useTodoStore()

const emit = defineEmits(['select'])

defineProps({
  date: {
    type: Date,
    required: true
  }
})

function handleBeforeLeave(el: any) {
  el.style.height = `${el.clientHeight}px`
}

</script>

<template>
  <TransitionGroup name="fade-collapse"
    @before-leave="handleBeforeLeave"
    tag="div"
    class="paper pt-4.5 pb-9">
    <Todo v-for="todo in todoStore.get(date)"
      class="py-3 w-full"
      :key="todo.id"
      :todo="todo"
      @edit="emit('select', todo)"
      @delete="todoStore.remove(todo.id)"
      @click="todoStore.toggleCompleted(todo.id)" />
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

.fade-collapse-leave-active {
  position: relative;
}
</style>