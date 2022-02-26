<template>
  <div
    class="task"
  >
    <input
      class="tick"
      type="checkbox"
      :checked="todo.completed"
      @change="() => completeTodo(todo.id)"
    >
    <span
      class="content"
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
      class="btn-delete"
      @click="() => deleteTodo(todo.id)"
    >
      ✗
    </button>
  </div>
</template>

<script>
import { completeTodo, deleteTodo } from '@/hooks/useTodos'

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
    return {
      completeTodo,
      deleteTodo,
    }
  },
}
</script>

<style>
.task {
    background-color: var(--c-green);
    border-radius: 20px;
    box-shadow: 0px 1px 1px 0px var(--c-green-dark);
    display: flex;
    margin-bottom: 5px;
    padding: 15px;
}

.content {
    flex-grow: 1;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    margin: -5px 0;
    padding: 0 10px;
    unicode-bidi: embed;
}

.btn-delete {
    background-color: unset;
    border: 0;
    color: var(--c-green-dark);
    cursor: pointer;
    font-family: 'Montserrat', Vazir;
    font-size: 16px;
    font-weight: 500;
    padding: 0;
}
</style>
