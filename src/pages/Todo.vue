<template>
  <div>
    <template
      v-for="todo in todos"
      :key="todo.id"
    >
      <todo-item
        :todo="todo"
        :focused="(todo.id === currentId)"
        @click="() => {select(todo.id); return false;}"
      />
    </template>

    <div class="flex p-2.5">
      <base-input
        v-model="newTodo"
        class="flex-grow"
        @enter-keyup="saveTodo"
      />

      <base-button
        class="px-3.5"
        @click="saveTodo"
      >
        <menu-icon class="text-2xl" />
      </base-button>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import TodoItem from '@/components/TodoItem'
import MenuIcon from '@/components/icons/MenuIcon'
import { useTodos } from '@/hooks/useTodos'
import { ref } from 'vue'

const { todos, addTodo } = useTodos()

const currentId = ref(-1)

function select(id) {
  if (currentId.value === id) {
    currentId.value = -1
  } else {
    currentId.value = id
  }
}

const newTodo = ref('')

function saveTodo() {
  addTodo(newTodo.value)
  newTodo.value = ''
}
</script>
