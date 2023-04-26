import { createRouter, createWebHistory } from 'vue-router'
import TodoList from '@/pages/todos/TodoList.vue'
import GroupList from '@/pages/groups/GroupList.vue'

export const routes = [
  {
    name: 'Home',
    path: '/',
    component: TodoList,
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

export default createRouter({
  history: createWebHistory(),
  routes,
})
