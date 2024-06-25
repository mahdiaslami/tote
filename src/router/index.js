import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/pages/todo/List.vue'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: TodoList,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
