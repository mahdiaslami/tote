<template>
  <todo-item
    v-for="todo in todos"
    :key="todo.id"
    :completed="todo.completed"
    :focused="(todo.id === currentId)"
    :text="todo.text"
    @tick-click="complete(todo.id)"
    @click="() => {select(todo.id); return false;}"
    @delete-click="deleteTodo(todo.id)"
  />

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

export default {
  name: 'App',

  components: {
    BaseInput,
    TodoItem,
  },

  data() {
    return {
      newTodo: '',
      todos: this.getFromLocalStorage() ?? [],
      currentId: -1,
    }
  },

  watch: {
    todos() {
      this.saveToLocalStorage()
    },
  },

  created() {
    this.database = document.location.pathname.split('/').pop()
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
      this.todos.push(this.createTodo())
      this.newTodo = ''
    },

    createTodo() {
      return {
        id: new Date().getTime(),
        text: this.newTodo,
        completed: false,
      }
    },

    complete(id) {
      const todo = this.todos.find((item) => item.id === id)
      todo.completed = !todo.completed
      this.saveToLocalStorage()
    },

    deleteTodo(id) {
      const index = this.todos.findIndex((todo) => todo.id === id)
      this.todos.splice(index, 1)
    },

    saveToLocalStorage() {
      localStorage.setItem(this.database, JSON.stringify(this.todos))
    },

    getFromLocalStorage() {
      return JSON.parse(localStorage.getItem(this.database))
    },
  },
}
</script>

<style>
* {
    box-sizing: border-box;
}

html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
}

:root {
    --c-green-light: #e6ffe6;
    --c-green: #e0f7e0;
    --c-green-dark: #b2d8b2;
    --c-green-darker: #677767;
}

body {
    background-color: var(--c-green-light);
    font-family: 'Montserrat', Vazir;
}

#app {
    margin: 0 auto;
    min-width: 200px;
    padding: 10px;
    width: 100%;
}

@media (min-width: 640px) {
    #app {
        width: 500px;
    }
}

.btn {
    cursor: pointer;
    font-family: 'Montserrat', Vazir;
    font-weight: 500;
}

.task {
    background-color: var(--c-green);
    border-radius: 20px;
    box-shadow: 0px 1px 1px 0px var(--c-green-dark);
    display: flex;
    padding: 15px;
    margin-bottom: 5px;
}

.task .content {
    flex-grow: 1;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    padding: 0 10px;
    unicode-bidi: embed;
    margin: -5px 0;
}

.task .btn-delete {
    border: 0;
    background-color: unset;
    font-size: 16px;
    padding: 0;
    color: var(--c-green-dark);
}

.form {
    padding: 10px;
    display: flex;
}

.form .btn-save {
    background-color: var(--c-green);
    border: 0;
    border-radius: 50px;
    box-shadow: 0px 1px 1px 0px var(--c-green-dark);
    padding: 10px;
    color: var(--c-green-darker);
}

.form .btn-save:hover {
    background-color: var(--c-green-dark);
}

/**
 * Utility
 */

.bold {
    font-weight: bold;
}

.linethrough {
    text-decoration-line: line-through;
}

.underline {
    text-decoration-line: underline;
}
</style>
