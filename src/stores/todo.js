import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore(
  'todo',
  () => {
    // List of current to-do tasks
    const tasks = ref([
      { id: 1, label: 'Clean Bathroom', purchased: true, highPriority: false },
      { id: 2, label: 'Get Groceries', purchased: true, highPriority: false },
      { id: 3, label: 'Do Homework', purchased: false, highPriority: true },
    ])

    // Record of all actions performed
    const history = ref([])

    // Generate next available ID
    const newTaskId = computed(() =>
      tasks.value.length ? Math.max(...tasks.value.map((i) => i.id)) + 1 : 1,
    )

    // Show most recent tasks first
    const reversedTasks = computed(() => [...tasks.value].reverse())

    // Add new task and log to history
    function addTask(label, highPriority) {
      tasks.value.push({
        id: newTaskId.value,
        label,
        highPriority,
        purchased: false,
      })
      history.value.push({
        label,
        action: 'Added',
        time: new Date().toLocaleString(),
        user: 'Taiki',
        highPriority,
      })
    }

    // Delete task and log to history
    function deleteTask(taskId) {
      const task = tasks.value.find((i) => i.id === taskId)
      if (task) {
        history.value.push({
          label: task.label,
          action: 'Deleted',
          time: new Date().toLocaleString(),
          user: 'Taiki',
          highPriority: task.highPriority,
        })
        tasks.value = tasks.value.filter((i) => i.id !== taskId)
      }
    }

    // Toggle task's completed status
    function togglePurchased(taskId) {
      const task = tasks.value.find((i) => i.id === taskId)
      if (task) {
        task.purchased = !task.purchased
        history.value.push({
          label: task.label,
          action: task.purchased ? 'Completed' : 'Restored',
          time: new Date().toLocaleString(),
          user: 'Taiki',
          highPriority: task.highPriority,
        })
      }
    }

    // Expose state and actions
    return {
      tasks,
      reversedTasks,
      addTask,
      togglePurchased,
      deleteTask,
      history,
    }
  },
  {
    persist: true, // Store data persistently (e.g., in localStorage)
  },
)
