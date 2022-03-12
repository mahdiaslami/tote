import { useDatabase } from '@/hooks/useDatabase'
import { v4 as uuid } from 'uuid'

const { database } = useDatabase()

if (!localStorage.migrated) {
  const newDatabase = {
    version: 2,
    groups: [],
    todos: [],
  }

  Object.keys(localStorage).forEach((key) => {
    let title = key

    if (title.trim() === '') {
      title = 'default'
    }

    const groupId = uuid()

    newDatabase.groups.push({
      id: groupId,
      title,
    })

    const array = JSON.parse(localStorage[key])

    if (!Array.isArray(array)) {
      return
    }

    newDatabase.todos = array.map((todo) => ({
      ...todo,
      id: uuid(),
      group_id: groupId,
    }))

    // TODO: remove key data after migrating.
  })

  database.groups = newDatabase.groups
  database.todos = newDatabase.todos

  localStorage.migrated = true
}
