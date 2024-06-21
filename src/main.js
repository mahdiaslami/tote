import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { StatusBar, Style } from '@capacitor/status-bar'
import { register } from 'swiper/element/bundle';

import App from '@/App.vue'
import router from '@/router'

import '@/assets/index.css'

register();

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')

StatusBar.setStyle({ style: Style.Light })
StatusBar.setBackgroundColor({ color: '#ffffff' })