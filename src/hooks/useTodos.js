import { useDatabase } from './useDatabase'

const { todos } = useDatabase()

function addTodo(text) {
  todos.push({
    id: new Date().getTime(),
    text,
    completed: false,
  })
}

function completeTodo(id) {
  const todo = todos.find((item) => item.id === id)
  todo.completed = !todo.completed
}

function deleteTodo(id) {
  const index = todos.findIndex((todo) => todo.id === id)
  todos.splice(index, 1)
}

export function useTodos() {
  return {
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
  }
}
