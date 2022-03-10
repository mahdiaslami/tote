<template>
  <div
    class="bg-primary shadow mb-1.5 p-3.5 rounded-2xl flex"
  >
    <input
      class="tick"
      type="checkbox"
      :checked="todo.completed"
      @change="() => completeTodo(todo.id)"
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
      class="text-primary-dark border-0 cursor-pointer font-bold p-0"
      @click="() => deleteTodo(todo.id)"
    >
      ✗
    </button>
  </div>
</template>

<script>
import { useTodos } from '@/hooks/useTodos'

export default {
  props: {
    focused: {
      type: Boolean,
      required: false,
      default: false,
    },

    todo: {
      type: Object,
      required: true,
    },
  },

  emits: ['click'],

  setup() {
    const { completeTodo, deleteTodo } = useTodos()

    return {
      completeTodo,
      deleteTodo,
    }
  },
}
</script>
