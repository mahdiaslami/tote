import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { StatusBar, Style } from '@capacitor/status-bar'
import { register } from 'swiper/element/bundle';

import App from '@/App.vue'
import router from '@/router'
import keyboard from '@/plugins/keyboard'

import '@/assets/index.css'

StatusBar.setStyle({ style: Style.Light })
StatusBar.setOverlaysWebView({ overlay: true });

register();

createApp(App)
  .use(createPinia())
  .use(router)
  .use(keyboard)
  .mount('#app')
