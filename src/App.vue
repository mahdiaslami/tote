<template>
  <navbar />

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

    <div class="flex p-10">
      <base-input
        v-model="newTodo"
        class="flex-grow"
        @enter-keyup="saveTodo"
      />

      <base-button
        @click="saveTodo"
      >
        Save
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton'
import Navbar from '@/components/Navbar'
import BaseInput from '@/components/BaseInput'
import TodoItem from '@/components/TodoItem'
import {
  database, todos, addTodo,
} from '@/hooks/useTodos'

export default {
  name: 'App',

  components: {
    BaseButton,
    Navbar,
    BaseInput,
    TodoItem,
  },

  setup() {
    return {
      database,
      todos,
      addTodo,
    }
  },

  data() {
    return {
      newTodo: '',
      currentId: -1,
    }
  },

  created() {
    document.title = `Todo: ${this.database}`
  },

  methods: {
    select(id) {
      if (this.currentId === id) {
        this.currentId = -1
      } else {
        this.currentId = id
      }
    },

    saveTodo() {
      this.addTodo(this.newTodo)
      this.newTodo = ''
    },
  },
}
</script>
