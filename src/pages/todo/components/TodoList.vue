<script setup>
import { useTodoStore } from '@/store/todo.js'
import Todo from '@/components/PannableTodo.vue'

const todoStore = useTodoStore()

const emit = defineEmits(['select'])

defineProps({
  date: {
    type: Date,
    required: true
  }
})

</script>

<template>
  <TransitionGroup name="fade"
    tag="div"
    class="paper">
    <Todo v-for="todo in todoStore.get(date)"
      v-show="!todo.deleted_at"
      class="first:pt-7.5 py-3 w-full"
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
}
</style>