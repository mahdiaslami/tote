import { v4 as uuid } from 'uuid'
import { useDatabase } from './useDatabase'
import { useConfirm } from './useConfirm'

const { database, groups } = useDatabase()
const { confirm } = useConfirm()

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

function removeGroup(id) {
  confirm('آیا از حذف این گروه اطمینان دارید؟', () => {
    const index = findIndex(id)
    groups.splice(index, 1)
  })
}

function findIndex(id) {
  return groups.findIndex((todo) => todo.id === id)
}

function getDefaultGroupId() {
  return database.default_group_id
}

export function useGroups() {
  return {
    groups,
    addGroup,
    updateGroup,
    removeGroup,
    getDefaultGroupId,
  }
}
