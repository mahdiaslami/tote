import { useDatabase } from '@/hooks/useDatabase'
import { v4 as uuid } from 'uuid'

const { database } = useDatabase()

if (!localStorage.migrated) {
  const newDatabase = {
    version: 2,
    groups: [],
    todos: [],
    default_group_id: null,
  }

  Object.keys(localStorage).forEach((key) => {
    let title = key

    if (title.trim() === '') {
      title = 'default'
    }

    const array = JSON.parse(localStorage[key])

    if (!Array.isArray(array)) {
      return
    }

    const groupId = uuid()

    newDatabase.groups.push({
      id: groupId,
      title,
    })

    array.forEach(
      (todo) => newDatabase.todos.push({
        ...todo,
        id: uuid(),
        group_id: groupId,
      }),
    )

    newDatabase.default_group_id = groupId

    // TODO: remove key data after migrating.
  })

  database.groups = newDatabase.groups
  database.todos = newDatabase.todos
  database.default_group_id = newDatabase.default_group_id

  localStorage.migrated = true

  location.reload()
}
