import { createRouter, createWebHistory } from 'vue-router'
import TodoListPage from '@/pages/todo/ListPage.vue'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: TodoListPage,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
