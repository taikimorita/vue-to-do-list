<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todo'
import trashIcon from './assets/delete.svg'

const header = ref('To-Do List')
const newItem = ref('')
const characterCount = computed(() => newItem.value.length)
const editing = ref(false)
const newItemHighPriority = ref(false)
const store = useTodoStore()
const saveItem = () => {
  store.addItem(newItem.value, newItemHighPriority.value)
  newItem.value = ''
  newItemHighPriority.value = false
  document.activeElement.blur()
}
const doEdit = (e) => {
  editing.value = e
  newItem.value = ''
  newItemHighPriority.value = false
}

const showConfirm = ref(false)
const itemToDelete = ref(null)

const askDelete = (item, event) => {
  if (event.ctrlKey) {
    store.deleteItem(item.id)
  } else {
    itemToDelete.value = item
    showConfirm.value = true
  }
}

const confirmDelete = () => {
  if (itemToDelete.value) {
    store.deleteItem(itemToDelete.value.id)
  }
  showConfirm.value = false
  itemToDelete.value = null
}

const cancelDelete = () => {
  showConfirm.value = false
  itemToDelete.value = null
}

const togglePurchased = (item) => {
  store.togglePurchased(item.id)
}
</script>

<template>
  <div>
    <div class="tabs">
      <router-link to="/" exact-active-class="active-tab">To-Do List</router-link>
      <router-link to="/history" exact-active-class="active-tab">Item History</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
.tabs {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
}
</style>
