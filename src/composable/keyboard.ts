import { Keyboard, type KeyboardInfo } from '@capacitor/keyboard'
import { onMounted, onUnmounted, reactive, watch } from 'vue'

type ListenerCallback = (keyboardHeight: number) => void
type Events = 'keyboardWillShow' | 'keyboardDidShow' |
    'keyboardWillHide' | 'keyboardDidHide'
type Listeners = { [tag: string]: ListenerCallback }

const data = reactive({
  keyboardHeight: window.screen.height * 0.41,
  showing: false,
  shown: false,

  show: () => Keyboard.show(),
  hide: () => Keyboard.hide(),
})

const listeners: { [id in Events]: Listeners } = {
  'keyboardWillShow': {},
  'keyboardDidShow': {},
  'keyboardWillHide': {},
  'keyboardDidHide': {},
}

function fire(eventName: Events, info?: KeyboardInfo) {
  if (info) {
    measureAndUpdateKeyboardHeight(info)
  }

  Object.values(listeners[eventName])
    .forEach((callback) => callback(data.keyboardHeight))
}

function measureAndUpdateKeyboardHeight(info: KeyboardInfo) {
  const virtualHardwareMenuHeight = window.screen.height - window.innerHeight
  const keyboardHeight = info.keyboardHeight - virtualHardwareMenuHeight

  if (data.keyboardHeight != keyboardHeight && keyboardHeight > 0) {
    data.keyboardHeight = keyboardHeight
  }
}

const temp1 = localStorage.getItem('v1/keyboard/height')
const temp2 = temp1 ? parseInt(temp1) : 0
data.keyboardHeight = temp2 > 0 ? temp2 : data.keyboardHeight

watch(
  data,
  (value) => localStorage.setItem(
    'v1/keyboard/height', `${value.keyboardHeight}`),
  { immediate: true }
)

export async function initKeyboard() {
  listeners['keyboardWillShow']['showing'] = () => data.showing = true
  listeners['keyboardWillHide']['showing'] = () => data.showing = false
  listeners['keyboardDidShow']['shown'] = () => data.shown = true
  listeners['keyboardDidHide']['shown'] = () => data.shown = false

  Keyboard.addListener(
    'keyboardWillShow',
    (info) => fire('keyboardWillShow', info)
  )
  Keyboard.addListener(
    'keyboardDidShow',
    (info) => fire('keyboardDidShow', info)
  )
  Keyboard.addListener(
    'keyboardWillHide',
    () => fire('keyboardWillHide')
  )
  Keyboard.addListener(
    'keyboardDidHide',
    () => fire('keyboardDidHide')
  )
}

export function useKeyboard() {
  return data
}

export function useKeyboardEventListener(
  eventName: Events,
  tag: string,
  callback: ListenerCallback
) {
  onMounted(() => listeners[eventName][tag] = callback)
  onUnmounted(() => delete listeners[eventName][tag])
}