import { createApp } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import App from '@/App'
import '@/assets/index.css'

createApp(App).mount('#app')

useRegisterSW({
  onNeedRefresh() {},
  onOfflineReady() {},
})
