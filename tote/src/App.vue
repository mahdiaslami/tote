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
