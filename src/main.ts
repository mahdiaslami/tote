import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { register } from 'swiper/element/bundle'

import App from './App.vue'
import router from '@/router'
import { initKeyboard } from '@/composable/keyboard'

import '@/assets/index.css'

const hammerPlugin = {
  install(app: VueApp) {
    app.directive<any, HammerListener>('touch', {
      mounted(el, { arg, modifiers, value }) {
        const hammer = new Hammer(el)
        const eventName = [arg, ...Object.keys(modifiers)].join(' ')

        hammer.on(eventName, value)
      }
    })
  }
};

(async () => {
  if (Capacitor.isNativePlatform()) {
    await StatusBar.setStyle({ style: Style.Light })
    await StatusBar.setOverlaysWebView({ overlay: true })

    // Wait 0.5s for setting overlay status bar
    await new Promise((resolve) => setTimeout(resolve, 500))
    await initKeyboard()
  }

  register()

  createApp(App)
    .use(createPinia())
    .use(router)
    .use(hammerPlugin)
    .mount('#app')
})()
