import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore(
  'todo',
  () => {
    // List of current to-do items
    const items = ref([
      { id: 1, label: 'Clean Bathroom', purchased: true, highPriority: false },
      { id: 2, label: 'Get Groceries', purchased: true, highPriority: false },
      { id: 3, label: 'Do Homework', purchased: false, highPriority: true },
    ])

    // Record of all actions performed
    const history = ref([])

    // Generate next available ID
    const newItemId = computed(() =>
      items.value.length ? Math.max(...items.value.map((i) => i.id)) + 1 : 1,
    )

    // Show most recent items first
    const reversedItems = computed(() => [...items.value].reverse())

    // Add new item and log to history
    function addItem(label, highPriority) {
      items.value.push({
        id: newItemId.value,
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

    // Delete item and log to history
    function deleteItem(itemId) {
      const item = items.value.find((i) => i.id === itemId)
      if (item) {
        history.value.push({
          label: item.label,
          action: 'Deleted',
          time: new Date().toLocaleString(),
          user: 'Taiki',
          highPriority: item.highPriority,
        })
        items.value = items.value.filter((i) => i.id !== itemId)
      }
    }

    // Toggle item's purchased status
    function togglePurchased(itemId) {
      const item = items.value.find((i) => i.id === itemId)
      if (item) item.purchased = !item.purchased
    }

    // Expose state and actions
    return {
      items,
      reversedItems,
      addItem,
      togglePurchased,
      deleteItem,
      history,
    }
  },
  {
    persist: true, // Store data persistently (e.g., in localStorage)
  },
)
