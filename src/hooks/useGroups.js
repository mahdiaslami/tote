import { v4 as uuid } from 'uuid'
import { useDatabase } from './useDatabase'

const { groups } = useDatabase()

function addGroup(title) {
  groups.push({
    id: uuid(),
    title,
  })
}

function updateGroup(id, title) {
  const index = findIndex(id)
  groups[index] = {
    id,
    title,
  }
}

function deleteGroup(id) {
  const index = findIndex(id)
  groups.splice(index, 1)
}

function findIndex(id) {
  return groups.findIndex((todo) => todo.id === id)
}

export function useGroups() {
  return {
    groups,
    addGroup,
    updateGroup,
    deleteGroup,
  }
}
