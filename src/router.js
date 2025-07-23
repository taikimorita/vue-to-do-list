import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import ToDoList from './ToDoList.vue'
import ItemHistory from './ItemHistory.vue'

// Define routes for app
const routes = [
  {
    path: '/',
    component: ToDoList,
  },
  {
    path: '/history',
    component: ItemHistory,
  },
]

// Create and export router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
