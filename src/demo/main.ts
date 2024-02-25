Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: '../../node_modules/cesium/Build/Cesium/'
})

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'virtual:uno.css'
import './main.css'

createApp(App).use(router).mount('#app')
