import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { StatusBar, Style } from '@capacitor/status-bar'
import { register } from 'swiper/element/bundle';

import App from '@/App.vue'
import router from '@/router'

import '@/assets/index.css'

StatusBar.setStyle({ style: Style.Light })
StatusBar.setOverlaysWebView({ overlay: true });

register();

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
