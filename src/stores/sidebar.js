import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    visiable: false
  }),

  actions: {
    open() {
      this.visiable = true
    },
      
    close() {
      this.visiable = false
    },
      
    toggle() {
      this.visiable = !this.visiable
    },
  },
})