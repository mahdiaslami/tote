import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/pages/todos/TodoList'
import GroupList from '@/pages/groups/GroupList'

export const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/groups',
  },
  {
    name: 'GroupList',
    path: '/groups',
    component: GroupList,
  },
  {
    name: 'TodoList',
    path: '/groups/:id/todos',
    component: TodoList,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
