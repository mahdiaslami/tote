import { v4 as uuid } from 'uuid'
import { useDatabase } from './useDatabase'

const { todos } = useDatabase()

function addTodo(text, groupId) {
  todos.push({
    id: uuid(),
    text,
    group_id: groupId,
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

function filterByGroupId(groupId) {
  return todos.filter(
    (todo) => todo.group_id == groupId,
  )
}

export function useTodos() {
  return {
    todos,
    addTodo,
    completeTodo,
    deleteTodo,
    filterByGroupId,
  }
}
