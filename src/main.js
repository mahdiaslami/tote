import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register/vue'
import App from './App'
import '@/assets/index.css'

createApp(App).mount('#app')

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})
