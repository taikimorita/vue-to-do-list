import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'
import ToDoList from './ToDoList.vue'
import TaskHistory from './TaskHistory.vue'

// Define routes for app
const routes = [
  {
    path: '/',
    component: ToDoList,
  },
  {
    path: '/history',
    component: TaskHistory,
  },
]

// Create and export router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
