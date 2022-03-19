<template>
  <div class="flex flex-col h-full">
    <div class="flex-grow">
      <template
        v-for="todo in filterByGroupId(groupId)"
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
import BaseInput from '@/components/BaseInput'
import { useTodos } from '@/hooks/useTodos'
import { useSidebar } from '@/hooks/useSidebar'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGroups } from '@/hooks/useGroups'
import TodoItem from './TodoItem'
import MenuButton from './MenuButton'

const route = useRoute()
const { toggle } = useSidebar()
const { getDefaultGroupId } = useGroups()
const { filterByGroupId, addTodo } = useTodos()

const groupId = route.params.id ?? getDefaultGroupId()

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
  addTodo(newTodo.value, groupId)
  newTodo.value = ''
}
</script>
