import { ref, watchEffect } from 'vue'
import './useDatabase'

const database = document.location.pathname.split('/').pop()

const todos = ref(
  JSON.parse(localStorage.getItem(database)) ?? [],
)

watchEffect(() => localStorage.setItem(database, JSON.stringify(todos.value)))

function addTodo(text) {
  todos.value.push({
    id: new Date().getTime(),
    text,
    completed: false,
  })
}

function completeTodo(id) {
  const todo = todos.value.find((item) => item.id === id)
  todo.completed = !todo.completed
}

function deleteTodo(id) {
  const index = todos.value.findIndex((todo) => todo.id === id)
  todos.value.splice(index, 1)
}

export function useTodos() {
  return {
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
  }
}
