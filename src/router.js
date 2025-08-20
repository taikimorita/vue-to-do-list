import { createWebHistory, createRouter } from 'vue-router'
import ToDoList from './ToDoList.vue'
import TaskHistory from './TaskHistory.vue'
import ImageUpload from './ImageUpload.vue'
import EligibilityMatrix from './EligibilityMatrix.vue'

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
  {
    path: '/matrix',
    component: EligibilityMatrix,
  },
]

// Create and export router
export const router = createRouter({
  history: createWebHistory(),
  routes,
})
