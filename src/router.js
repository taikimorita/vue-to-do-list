import { createWebHistory, createRouter } from 'vue-router'
import ToDoList from './ToDoList.vue'
import TaskHistory from './TaskHistory.vue'
import ImageUpload from './ImageUpload.vue'

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
  {
    path: '/upload',
    component: ImageUpload,
  },
]

// Create and export router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
