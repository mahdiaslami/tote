import { ref } from 'vue'

const visible = ref(false)
let message = ''

let yesCallback = null

function confirm(msg, callback) {
  message = msg
  yesCallback = callback

  visible.value = true
}

function confirmed() {
  if (yesCallback) {
    yesCallback()
  }

  close()
}

function close() {
  visible.value = false
}

function getMessage() {
  return message
}

export function useConfirm() {
  return {
    visible,
    close,
    confirm,
    confirmed,
    getMessage,
  }
}
