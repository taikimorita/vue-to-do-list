<script setup>
import { ref, computed } from 'vue'
import { useTodoStore } from './stores/todo'
import trashIcon from './assets/delete.svg'

const header = ref('To-Do List')
const characterCount = computed(() => newItem.value.length)
const editing = ref(false)
const newItem = ref('')
const newItemHighPriority = ref(false)
const store = useTodoStore()
const saveItem = () => {
  store.addItem(newItem.value, newItemHighPriority.value)
  newItem.value = ''
  newItemHighPriority.value = false
}
const doEdit = (e) => {
  editing.value = e
  newItem.value = ''
  newItemHighPriority.value = false
}

const showConfirm = ref(false)
const itemToDelete = ref(null)

const askDelete = (item, event) => {
  if (event.shiftKey) {
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
  <div class="header">
    <h1>{{ header }}</h1>
    <button v-if="editing" class="btn" @click="doEdit(false)">Cancel</button>
    <button v-else class="btn btn-primary" @click="doEdit(true)">Add Item</button>
  </div>
  <form class="add-item-form" v-if="editing" @submit.prevent="saveItem">
    <input v-model.trim="newItem" type="text" placeholder="Add an item" />
    <div class="counter">{{ characterCount }}/200</div>
    <label>
      <input type="checkbox" v-model="newItemHighPriority" />
      High Priority
    </label>
    <button :disabled="newItem.length === 0" class="btn btn-primary">Save Item</button>
  </form>
  <ul>
    <li
      v-for="(item, index) in store.reversedItems"
      @click="togglePurchased(item)"
      :key="item.id"
      class="static-class"
      :class="{ strikeout: item.purchased, priority: item.highPriority }"
    >
      {{ item.label }}
      <img
        :src="trashIcon"
        alt="Delete"
        class="trash"
        @click.stop="askDelete(item, $event)"
        title="Delete"
      />
    </li>
  </ul>
  <div v-if="showConfirm" class="model-overlay">
    <div class="modal">
      <p>
        Are you sure you want to delete "<strong>{{ itemToDelete.label }}</strong
        >"?
      </p>
      <div class="model-buttons">
        <button class="btn btn-danger" @click="confirmDelete">Yes</button>
        <button class="btn" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>
  <p v-if="!store.items.length">Nothing to see here</p>
</template>
