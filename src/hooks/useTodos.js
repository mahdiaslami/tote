import { ref, watchEffect } from 'vue'

export const database = document.location.pathname.split('/').pop()

export const todos = ref(
  JSON.parse(localStorage.getItem(database)) ?? [],
)

watchEffect(() => localStorage.setItem(database, JSON.stringify(todos.value)))

export function addTodo(text) {
  todos.value.push({
    id: new Date().getTime(),
    text,
    completed: false,
  })
}

export function completeTodo(id) {
  const todo = todos.value.find((item) => item.id === id)
  todo.completed = !todo.completed
}

export function deleteTodo(id) {
  const index = todos.value.findIndex((todo) => todo.id === id)
  todos.value.splice(index, 1)
}