import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { StatusBar, Style } from '@capacitor/status-bar'

import App from '@/App.vue'
import router from '@/router'

import '@/assets/index.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')

StatusBar.setStyle({ style: Style.Light })
StatusBar.setBackgroundColor({ color: '#fafafa' })