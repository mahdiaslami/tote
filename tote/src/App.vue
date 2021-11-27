<template>
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

  <div class="form">
    <base-input
      v-model="newTodo"
      @enter-keyup="saveTodo"
    />

    <button
      class="btn btn-save"
      @click="saveTodo"
    >
      Save
    </button>
  </div>
</template>

<script>
import BaseInput from '@/components/BaseInput'
import TodoItem from '@/components/TodoItem'
import {
  database, todos, addTodo,
} from '@/hooks/useTodos'

export default {
  name: 'App',

  components: {
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

<style>

.form {
    padding: 10px;
    display: flex;
}

.btn-save {
    background-color: var(--c-green);
    border: 0;
    border-radius: 50px;
    box-shadow: 0px 1px 1px 0px var(--c-green-dark);
    padding: 10px;
    color: var(--c-green-darker);
}

.btn-save:hover {
    background-color: var(--c-green-dark);
}

</style>
