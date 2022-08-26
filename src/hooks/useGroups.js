import { v4 as uuid } from 'uuid'
import { computed } from 'vue'
import { useDatabase } from './useDatabase'
import { useConfirm } from './useConfirm'

const { database, groups } = useDatabase()
const { confirm } = useConfirm()

const defaultGroupId = computed({
  get() {
    return database.default_group_id
  },

  set(value) {
    database.default_group_id = value
  },
})

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

export function useGroups() {
  if (groups.length === 0) {
    addGroup('default')
    defaultGroupId.value = groups[0].id
  }

  return {
    groups,
    defaultGroupId,
    addGroup,
    updateGroup,
    removeGroup,
  }
}
