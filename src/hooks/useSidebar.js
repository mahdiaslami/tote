import { ref } from 'vue'

const isOpen = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}

export function useSidebar() {
  return {
    isOpen,
    open,
    close,
    toggle,
  }
}
