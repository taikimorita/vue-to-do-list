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

    // Image uploads (persisted)
    const uploads = ref([])

    // Generate next available ID
    const newTaskId = computed(() =>
      tasks.value.length ? Math.max(...tasks.value.map((i) => i.id)) + 1 : 1,
    )

    const newUploadId = computed(() =>
      uploads.value.length ? Math.max(...uploads.value.map((u) => u.id)) + 1 : 1,
    )

    // Show most recent tasks first
    const reversedTasks = computed(() => [...tasks.value].reverse())

    const reversedUploads = computed(() => [...uploads.value].reverse())

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

    // Add an upload (dataUrl, caption)
    function addUpload(dataUrl, caption) {
      uploads.value.push({
        id: newUploadId.value,
        url: dataUrl,
        caption: caption || '',
        time: new Date().toLocaleString(),
        user: 'Taiki',
      })
      history.value.push({
        label: caption || '(image)',
        action: 'Image Added',
        time: new Date().toLocaleString(),
        user: 'Taiki',
        highPriority: false,
      })
    }

    // Delete upload
    function deleteUpload(uploadId) {
      const u = uploads.value.find((x) => x.id === uploadId)
      if (u) {
        history.value.push({
          label: u.caption || '(image)',
          action: 'Image Deleted',
          time: new Date().toLocaleString(),
          user: 'Taiki',
          highPriority: false,
        })
        uploads.value = uploads.value.filter((x) => x.id !== uploadId)
      }
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

      // uploads API
      uploads,
      reversedUploads,
      addUpload,
      deleteUpload,
    }
  },
  {
    persist: true, // Store data persistently (e.g., in localStorage)
  },
)
