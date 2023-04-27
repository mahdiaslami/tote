<template>
  <div
    class="bg-primary shadow mb-1.5 p-3.5 rounded-2xl flex"
  >
    <input
      class="tick"
      type="checkbox"
      :checked="todo.completed"
      @change="todos.complete(todo.id)"
    >

    <span
      class="flex-grow leading-7 -my-1 px-2.5"
      :class="{
        'font-bold line-through': todo.completed,
        'underline': focused
      }"
      dir="auto"
      @click="$emit('click')"
    >
      {{ todo.text }}
    </span>

    <button
      class="text-ternary border-0 cursor-pointer font-bold p-0"
      @click="todos.remove(todo.id)"
    >
      ✗
    </button>
  </div>
</template>

<script setup>
import { useTodosStore } from '@/stores/todos'

const todos = useTodosStore()

defineProps({
  focused: {
    type: Boolean,
    default: false,
  },

  todo: {
    type: Object,
    required: true,
  },
})

defineEmits(['click'])

</script>
