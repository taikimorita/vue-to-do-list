import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore(
  'todo',
  () => {
    const items = ref([
      { id: 1, label: 'Clean Bathroom', purchased: true, highPriority: false },
      { id: 2, label: 'Get Groceries', purchased: true, highPriority: false },
      { id: 3, label: 'Do Homework', purchased: false, highPriority: true },
    ])

    const newItemId = computed(() =>
      items.value.length ? Math.max(...items.value.map((i) => i.id)) + 1 : 1,
    )

    const reversedItems = computed(() => [...items.value].reverse())

    function addItem(label, highPriority) {
      items.value.push({
        id: newItemId.value,
        label,
        highPriority,
        purchased: false,
      })
    }

    function togglePurchased(itemId) {
      const item = items.value.find((i) => i.id === itemId)
      if (item) item.purchased = !item.purchased
    }

    return {
      items,
      reversedItems,
      addItem,
      togglePurchased,
    }
  },
  {
    persist: true,
  },
)
