<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todo'
import trashIcon from './assets/delete.svg'
import { onMounted, onUnmounted } from 'vue'

// Input field and flags
const newItem = ref('')
const characterCount = computed(() => newItem.value.length)
const editing = ref(false)
const newItemHighPriority = ref(false)
const newItemInput = ref(null)

// Pinia store instance
const store = useTodoStore()

// Save a new item to the store
const saveItem = () => {
  store.addItem(newItem.value, newItemHighPriority.value)
  newItem.value = ''
  newItemHighPriority.value = false
}

// Start or cancel edit mode
const doEdit = (e) => {
  editing.value = e
  newItem.value = ''
  newItemHighPriority.value = false
}

// Ctrl+K shortcut selects input box
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (editing.value) newItemInput.value?.focus()
  } else if (e.key === 'Escape') {
    if (document.activeElement === newItemInput.value) {
      newItemInput.value.blur()
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
const itemToDelete = ref(null)

// Show confirm modal or delete immediately if Ctrl is held
const askDelete = (item, event) => {
  if (event.ctrlKey) {
    store.deleteItem(item.id)
  } else {
    itemToDelete.value = item
    showConfirm.value = true
  }
}

// Confirm deletion after modal prompt
const confirmDelete = () => {
  if (itemToDelete.value) {
    store.deleteItem(itemToDelete.value.id)
  }
  showConfirm.value = false
  itemToDelete.value = null
}

// Cancel the deletion prompt
const cancelDelete = () => {
  showConfirm.value = false
  itemToDelete.value = null
}

// Mark item as purchased/unpurchased
const togglePurchased = (item) => {
  store.togglePurchased(item.id)
}
</script>

<template>
  <!-- Page header with add/cancel buttons -->
  <div class="header">
    <h1>To-Do List</h1>
    <button v-if="editing" class="btn btn-cancel" @click="doEdit(false)">Cancel</button>
    <button v-else class="btn btn-primary" @click="doEdit(true)">Add Item</button>
  </div>

  <!-- Form to add a new item -->
  <form class="add-item-form" v-if="editing" @submit.prevent="saveItem">
    <div class="input-block">
      <input
        ref="newItemInput"
        v-model.trim="newItem"
        type="text"
        placeholder="Add an item"
        maxlength="200"
      />
      <div class="form-footer">
        <div class="counter">{{ characterCount }}/200</div>
        <label class="priority-checkbox" for="priority-check">
          <input id="priority-check" type="checkbox" v-model="newItemHighPriority" />
          High Priority
        </label>
      </div>
    </div>

    <button type="submit" :disabled="newItem.length === 0" class="btn btn-primary">
      Save Item
    </button>
  </form>

  <!-- Render list of items -->
  <ul>
    <li
      v-for="(item, index) in store.reversedItems"
      :key="item.id"
      class="todo-item static-class"
      :class="{ strikeout: item.purchased, priority: item.highPriority }"
    >
      <span @click="togglePurchased(item)">
        {{ item.label }}
      </span>
      <img
        :src="trashIcon"
        alt="Delete"
        class="trash"
        @click.stop="askDelete(item, $event)"
        title="Delete"
      />
    </li>
  </ul>

  <!-- Delete confirmation modal -->
  <div v-if="showConfirm" class="modal-overlay">
    <div class="modal">
      <p>
        Are you sure you want to delete "<strong>{{ itemToDelete.label }}</strong
        >"?
      </p>
      <div class="modal-buttons">
        <button class="btn btn-danger" @click="confirmDelete">Yes</button>
        <button class="btn" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>

  <!-- Message for empty list -->
  <p v-if="!store.items.length">Nothing to see here</p>
</template>
