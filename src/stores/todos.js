import { defineStore } from 'pinia'
import { useDatabase } from '@/hooks/useDatabase'
import { v4 as uuid } from 'uuid'

const { todos } = useDatabase()

export const useTodosStore = defineStore('todos', {
  state: () => ({
    
  }),

  actions: {
    add(text, groupId) {
      todos.push({
        id: uuid(),
        text,
        group_id: groupId,
        completed: false,
      })
    },

    complete(id) {
      const todo = todos.find((item) => item.id === id)
      todo.completed = !todo.completed
    },

    remove(id) {
      const index = todos.findIndex((todo) => todo.id === id)
      todos.splice(index, 1)
    },

    filterByGroupId(groupId) {
      return todos.filter(
        (todo) => todo.group_id == groupId,
      )
    },
  },
})