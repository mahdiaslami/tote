<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <template
        v-for="todo in todos.filterByGroupId(groupId)"
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

      <menu-button
        class="lg:hidden"
        @click="toggle"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { useSidebar } from '@/hooks/useSidebar.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import TodoItem from './TodoItem.vue'
import MenuButton from './MenuButton.vue'
import { useTodosStore } from '@/stores/todos'
import { useGroupsStore } from '@/stores/groups'

const route = useRoute()
const { toggle } = useSidebar()
const groups = useGroupsStore()
const todos = useTodosStore()

const groupId = route.params.id ?? groups.default

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
  todos.add(newTodo.value, groupId)
  newTodo.value = ''
}
</script>
