import { reactive, watchEffect } from 'vue'

let initialDatabase = {
  version: 2,
  todos: [],
  groups: [],
  default_group_id: null,
}

if (localStorage.databaseV2) {
  initialDatabase = JSON.parse(localStorage.databaseV2)
}

const database = reactive(initialDatabase)

watchEffect(() => {
  localStorage.databaseV2 = JSON.stringify(database)
})

export function useDatabase() {
  return {
    database,
    todos: database.todos,
    groups: database.groups,
  }
}
