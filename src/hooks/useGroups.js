import { useDatabase } from './useDatabase'

const { groups } = useDatabase()

function addGroup(title) {
  groups.push({
    id: new Date().getTime(),
    title,
  })
}

function deleteGroup(id) {
  const index = groups.findIndex((todo) => todo.id === id)
  groups.splice(index, 1)
}

export function useGroups() {
  return {
    groups,
    addGroup,
    deleteGroup,
  }
}
