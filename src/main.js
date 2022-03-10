import { createApp } from 'vue'
import App from '@/App'
import { router } from '@/router/router'
import '@/assets/index.css'
import '@/migration-to-v2'

createApp(App)
  .use(router)
  .mount('#app')
