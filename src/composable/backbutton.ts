import { App, type BackButtonListenerEvent } from "@capacitor/app"
import { onMounted, onUnmounted } from "vue"

type Listener = (canGoBack: boolean) => boolean

const listeners: { [tag: string]: Listener } = {}

App.addListener('backButton', (ev: BackButtonListenerEvent) => {
    let exit = true

    Object.values(listeners)
        .forEach((callback) => exit = callback(ev.canGoBack))

    if (exit) {
        App.exitApp()
    }
})

export function useBackEventListener(tag: string, callback: Listener) {
    onMounted(() => listeners[tag] = callback)
    onUnmounted(() => delete listeners[tag])
}


