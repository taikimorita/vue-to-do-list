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
        <tr v-for="(record, index) in history" :key="index">
          <td>{{ record.label }}</td>
          <td>{{ record.action }}</td>
          <td>{{ record.time }}</td>
          <td>{{ record.user }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
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
</style>
