if (!localStorage.databaseV2) {
  const database = {
    version: 2,
    groups: [],
    todos: [],
  }

  Object.keys(localStorage).forEach((key) => {
    let title = key

    if (title.trim() === '') {
      title = 'default'
    }

    const groupId = Date.now()

    database.groups.push({
      id: groupId,
      title,
    })

    const array = JSON.parse(localStorage[key])

    database.todos = array.map((todo) => ({
      ...todo,
      group_id: groupId,
    }))

    // TODO: remove key data after migrating.
  })

  localStorage.databaseV2 = JSON.stringify(database)
}
