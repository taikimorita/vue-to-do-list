<template>
  <div>
    <h2>Item History</h2>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Action</th>
          <th>Timestamp</th>
          <th>Submitted By</th>
        </tr>
      </thead>
      <tbody>
        <!-- Display each history entry -->
        <tr v-for="(record, index) in history" :key="index">
          <td :class="{ 'high-priority-text': record.highPriority }">
            {{ record.label }}
          </td>
          <td>{{ record.action }}</td>
          <td>{{ record.time }}</td>
          <td>{{ record.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
// Import and access todo history from store
import { useTodoStore } from './stores/todo'

const store = useTodoStore()
const history = store.history
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
}

/* Highlight high-priority items */
.high-priority-text {
  color: #de751f;
  font-weight: bold;
}
</style>
