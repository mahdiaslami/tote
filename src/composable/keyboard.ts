import { Keyboard } from '@capacitor/keyboard'
import { onMounted, onUnmounted, reactive, type App } from 'vue'

// TODO: move keyboard to composables
// TODO: rename to ListenerCallback. don't forget backbutton.ts
type Listener = (keyboardHeight: number) => void
type Events = 'keyboardWillShow' | 'keyboardDidShow' | 'keyboardWillHide' | 'keyboardDidHide'
type Listeners = { [tag: string]: Listener }

const data = reactive({
    keyboardHeight: 0,
    screenHeight: 0,
    visiable: false,

    show: () => Keyboard.show(),
    hide: () => Keyboard.hide(),
})

const listeners: { [id in Events]: Listeners } = {
    'keyboardWillShow': {},
    'keyboardDidShow': {},
    'keyboardWillHide': {},
    'keyboardDidHide': {},
}

function fire(eventName: Events) {
    Object.values(listeners[eventName])
        .forEach((callback) => callback(data.keyboardHeight))
}

function guessHeight() {
    data.screenHeight = document.body.clientHeight

    return new Promise((resolve) => {
        Keyboard.addListener('keyboardDidShow', () => {
            const app = document.getElementById('app')
            data.keyboardHeight = data.screenHeight - app!.clientHeight

            Keyboard.hide()
                .then(() => Keyboard.removeAllListeners())
                .then(() => resolve(null))
        })

        Keyboard.show()
    })
}


export async function initKeyboard() {
    await guessHeight()

    listeners['keyboardDidShow']['visiable'] = () => data.visiable = true
    listeners['keyboardDidHide']['visiable'] = () => data.visiable = false

    Keyboard.addListener('keyboardWillShow', () => fire('keyboardWillShow'))
    Keyboard.addListener('keyboardDidShow', () => fire('keyboardDidShow'))
    Keyboard.addListener('keyboardWillHide', () => fire('keyboardWillHide'))
    Keyboard.addListener('keyboardDidHide', () => fire('keyboardDidHide'))
}

export function useKeyboard() {
    return data
}

export function useKeyboardEventListener(eventName: Events, tag: string, callback: Listener) {
    onMounted(() => listeners[eventName][tag] = callback)
    onUnmounted(() => delete listeners[eventName][tag])
}