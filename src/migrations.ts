import { PersianDate } from './class/persiandate'

export function migrate(): void {
  let temp, todos, index

  temp = localStorage.getItem('v1/todos')
  todos = temp ? JSON.parse(temp) : []

  temp = localStorage.getItem('v1/migrations/index')
  index = temp ? parseInt(temp) : 0

  if (todos) {
    for (; index < migrations.length; index++) {
      todos = migrations[index](todos)
    }
  }

  localStorage.setItem('v1/todos', JSON.stringify(todos))
  localStorage.setItem('v1/migrations/index', `${migrations.length}`)
}

const migrations = [
  // add date_group key
  (todos: any) => {
    return todos.map((el: any) => ({
      ...el,
      date_group: el.date_group ?? null
    }))
  },

  // add type key
  (todos: any) => {
    return todos.map((el: any) => ({
      ...el,
      type: el.type ?? (el.date_group ? 'daily' : 'mandatory')
    }))
  },

  // add started_at key
  (todos: any) => {
    return todos.map((el: any) => ({
      ...el,
      started_at: el.started_at ?? el.completed_at ?? Date.now()
    }))
  },

  // fix started_at should be equal date_group
  (todos: any) => {
    return todos.map((el: any) => {
      let started_at = Date.now()

      if (el.date_group) {
        started_at = PersianDate.fromDateGroup(el.date_group).getTime() + 1
      } else if (el.completed_at) {
        started_at = el.completed_at
      }

      return {
        ...el,
        started_at
      }
    })
  }
]