import { createApp } from 'vue'
import './style.css'
//element plus css样式
import 'element-plus/dist/index.css'
import App from './App.vue'

// Unocss
import "@unocss/reset/tailwind.css";
import 'uno.css'

//vue-router路由管理
import router from "./router/index";

// pinia全局状态管理
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')
