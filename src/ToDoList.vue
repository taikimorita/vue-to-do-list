<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todo'
import trashIcon from './assets/delete.svg'
import { onMounted, onUnmounted } from 'vue'

// Input field and flags
const newTask = ref('')
const characterCount = computed(() => newTask.value.length)
const editing = ref(false)
const newTaskHighPriority = ref(false)
const newTaskInput = ref(null)

// Pinia store instance
const store = useTodoStore()

// Save a new task to the store
const saveTask = () => {
  store.addTask(newTask.value, newTaskHighPriority.value)
  newTask.value = ''
  newTaskHighPriority.value = false
}

// Start or cancel edit mode
const doEdit = (e) => {
  editing.value = e
  newTask.value = ''
  newTaskHighPriority.value = false
}

// Ctrl+K shortcut selects input box
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (editing.value) newTaskInput.value?.focus()
  } else if (e.key === 'Escape') {
    if (document.activeElement === newTaskInput.value) {
      newTaskInput.value.blur()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Modal confirmation state
const showConfirm = ref(false)
const taskToDelete = ref(null)

// Show confirm modal or delete immediately if Ctrl is held
const askDelete = (task, event) => {
  if (event.ctrlKey) {
    store.deleteTask(task.id)
  } else {
    taskToDelete.value = task
    showConfirm.value = true
  }
}

// Confirm deletion after modal prompt
const confirmDelete = () => {
  if (taskToDelete.value) {
    store.deleteTask(taskToDelete.value.id)
  }
  showConfirm.value = false
  taskToDelete.value = null
}

// Cancel the deletion prompt
const cancelDelete = () => {
  showConfirm.value = false
  taskToDelete.value = null
}

// Mark task as purchased/unpurchased
const togglePurchased = (task) => {
  store.togglePurchased(task.id)
}
</script>

<template>
  <!-- Page header with add/cancel buttons -->
  <div class="header">
    <h1>To-Do List</h1>
    <button v-if="editing" class="btn btn-cancel" @click="doEdit(false)">Cancel</button>
    <button v-else class="btn btn-primary" @click="doEdit(true)">Add Task</button>
  </div>

  <!-- Form to add a new task -->
  <form class="add-task-form" v-if="editing" @submit.prevent="saveTask">
    <div class="input-block">
      <input
        ref="newTaskInput"
        v-model.trim="newTask"
        type="text"
        placeholder="Add a task"
        maxlength="200"
      />
      <div class="form-footer">
        <div class="counter">{{ characterCount }}/200</div>
        <label class="priority-checkbox" for="priority-check">
          <input id="priority-check" type="checkbox" v-model="newTaskHighPriority" />
          High Priority
        </label>
      </div>
    </div>

    <button type="submit" :disabled="newTask.length === 0" class="btn btn-primary">
      Save Task
    </button>
  </form>

  <!-- Render list of tasks -->
  <ul>
    <li
      v-for="(task, index) in store.reversedTasks"
      :key="task.id"
      class="todo-task static-class"
      :class="{ strikeout: task.purchased, priority: task.highPriority }"
    >
      <span @click="togglePurchased(task)">
        {{ task.label }}
      </span>
      <img
        :src="trashIcon"
        alt="Delete"
        class="trash"
        @click.stop="askDelete(task, $event)"
        title="Delete"
      />
    </li>
  </ul>

  <!-- Delete confirmation modal -->
  <div v-if="showConfirm" class="modal-overlay">
    <div class="modal">
      <p>
        Are you sure you want to delete "<strong>{{ taskToDelete.label }}</strong
        >"?
      </p>
      <div class="modal-buttons">
        <button class="btn btn-danger" @click="confirmDelete">Yes</button>
        <button class="btn" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>

  <!-- Message for empty list -->
  <p v-if="!store.tasks.length">Nothing to see here</p>
</template>
