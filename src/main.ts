import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import { register } from 'swiper/element/bundle'

import App from './App.vue'
import router from '@/router'
import { initKeyboard } from '@/composable/keyboard'

import '@/assets/index.css'

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
    .mount('#app')
})()

