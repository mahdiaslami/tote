import { defineStore } from 'pinia'

export const useConfirmStore = defineStore('confirm', {
  callback: null,
  message: '',

  state: () => ({
    visiable: false,
    message: '',
  }),

  actions: {
    confirm(msg, callback) {
      this.message = msg
      this.callback = callback
      this.visiable = true
    },

    accept() {
      if (this.callback) {
        this.callback()
      }

      this.visiable = false
    },

    reject() {
      this.visiable = false
    },
  },
})