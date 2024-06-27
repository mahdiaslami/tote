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
  <TransitionGroup
    name="fade"
    tag="div"
    class="p-5 bg-dark-800"
  >
    <Todo
      v-for="todo in todoStore.get(date)"
      v-show="!todo.deleted_at"
      :key="todo.id"
      class="w-full py-3"
      :todo="todo"
      @edit="emit('select', todo)"
      @delete="todoStore.remove(todo.id)"
      @click="todoStore.toggleCompleted(todo.id)"
    />
  </TransitionGroup>
</template>
