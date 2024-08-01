import { Keyboard } from '@capacitor/keyboard'
import { onMounted, onUnmounted, reactive, type App } from 'vue'

// TODO: rename to ListenerCallback. don't forget backbutton.ts
type Listener = (keyboardHeight: number) => void
type Events = 'keyboardWillShow' | 'keyboardDidShow' | 'keyboardWillHide' | 'keyboardDidHide'
type Listeners = { [tag: string]: Listener }

const data = reactive({
    keyboardHeight: 0,
    screenHeight: 0,
})

const listeners: { [id in Events]: Listeners } = {
    'keyboardWillShow': {},
    'keyboardDidShow': {},
    'keyboardWillHide': {},
    'keyboardDidHide': {},
}

Keyboard.addListener('keyboardWillShow', () => fire('keyboardWillShow'))
Keyboard.addListener('keyboardDidShow', () => fire('keyboardDidShow'))
Keyboard.addListener('keyboardWillHide', () => fire('keyboardWillHide'))
Keyboard.addListener('keyboardDidHide', () => fire('keyboardDidHide'))

function fire(eventName: Events) {
    Object.values(listeners[eventName])
        .forEach((callback) => callback(data.keyboardHeight))
}

function guessHeight() {
    data.screenHeight = document.body.clientHeight

    listeners['keyboardDidShow']['guess'] = () => {
        const app = document.getElementById('app')
        if (app === null) {
            throw "element with 'app' id doesn't exists"
        }

        data.keyboardHeight = data.screenHeight - app.clientHeight
        Keyboard.hide()
        delete listeners['keyboardDidShow']['guess']
    }

    Keyboard.show()
}

export default {
    install(app: App, options: any) {
        guessHeight()
    }
}

export function useKeyboard() {
    return {
        get height(): number {
            return data.keyboardHeight
        },
        get screenHeight(): number {
            return data.screenHeight
        },

        show() {
            Keyboard.show()
        },
        hide() {
            Keyboard.hide()
        }
    }
}

export function useKeyboardEventListener(eventName: Events, tag: string, callback: Listener) {
    onMounted(() => listeners[eventName][tag] = callback)
    onUnmounted(() => delete listeners[eventName][tag])
}