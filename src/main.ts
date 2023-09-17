import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";

import Home from './pages/Home.vue'
import Audit from './pages/Audit.vue'
import Firewall from './pages/Firewall.vue'

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/audit',
    component: Audit,
  },
  {
    path: '/firewall',
    component: Firewall,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
