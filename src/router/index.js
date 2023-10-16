import { createRouter, createWebHistory } from 'vue-router'
import Todos from '@/pages/Todos.vue'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: Todos,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
