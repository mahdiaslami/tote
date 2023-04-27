import { defineStore } from 'pinia'
import { useDatabase } from '@/hooks/useDatabase'
import { v4 as uuid } from 'uuid'

const { database, groups } = useDatabase()

export const useGroupsStore = defineStore('groups', {
  state: () => ({ 
    get default() {
      return database.default_group_id
    },

    set default(value) {
      database.default_group_id = value
    },
  }),

  actions: {
    get() {
      return groups
    },

    add(title) {
      groups.push({
        id: uuid(),
        title,
      })
    },

    update(id, title) {
      const index = this.findIndex(id)
      groups[index] = {
        id,
        title,
      }
    },

    remove(id) {
      utils.confirm('آیا از حذف این گروه اطمینان دارید؟', () => {
        const index = this.findIndex(id)
        groups.splice(index, 1)
      })
    },

    findIndex(id) {
      return groups.findIndex((todo) => todo.id === id)
    },
  },
})