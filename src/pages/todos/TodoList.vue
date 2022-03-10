<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
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
    </div>

    <div class="flex p-2.5">
      <base-input
        v-model="newTodo"
        class="flex-grow"
        @enter-keyup="saveTodo"
      />

      <menu-button @click="toggle" />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput'
import TodoItem from '@/components/TodoItem'
import { useTodos } from '@/hooks/useTodos'
import { useSidebar } from '@/hooks/useSidebar'
import { ref } from 'vue'
import MenuButton from './MenuButton'

const { toggle } = useSidebar()
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
