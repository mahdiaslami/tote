import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/pages/todos/TodoList'
import GroupList from '@/pages/groups/GroupList'

export const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/groups', component: GroupList },
  { path: '/todos', component: TodoList },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
