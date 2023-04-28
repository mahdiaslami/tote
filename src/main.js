import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/index.css'
import '@/migration-to-v2'
import { useConfirmStore } from '@/stores/confirm'

const app = createApp(App)

app.use(createPinia())
app.use(router)

window.utils = {
  confirm(msg, callback) {
    useConfirmStore().confirm(msg, callback)
  }
}

app.mount('#app')
