<template>
  <div class="eligibility-matrix">
    <h1 class="title">ESP Eligibility Matrix</h1>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Status</th>
          <th>File</th>
          <th>Description</th>
          <th></th>
          <th>Type</th>
          <th></th>
          <th>Custodian</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td
            v-for="(col, colIndex) in row"
            :key="colIndex"
            @dblclick="editCell(rowIndex, colIndex)"
            :class="getCellClass(colIndex, col)"
          >
            <input
              v-if="editingCell.row === rowIndex && editingCell.col === colIndex"
              v-model="rows[rowIndex][colIndex]"
              @blur="stopEditing"
              @keyup.enter="stopEditing"
              autofocus
            />
            <span v-else>{{ col }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rows = ref([
  ['Australia', 'DEV', '.pdf', '', '', 'ENABLED', '', ''],
  ['Austria', 'WITH SME', '.pdf', '', '', 'ENABLED', '', ''],
  ['Belgium', 'PUBLISHED', '.pdf', '', '', 'ENABLED', '', ''],
])

const editingCell = ref({ row: null, col: null })

function editCell(row, col) {
  editingCell.value = { row, col }
}

function stopEditing() {
  editingCell.value = { row: null, col: null }
}

function getCellClass(colIndex, value) {
  if (colIndex === 1) {
    // Status column
    if (value === 'DEV') return 'status-dev'
    if (value === 'WITH SME') return 'status-sme'
    if (value === 'PUBLISHED') return 'status-published'
  }
  if (colIndex === 5) {
    if (value === 'ENABLED') return 'status-enabled'
  }
  return ''
}
</script>

<style scoped>
.eligibility-matrix {
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

td {
  cursor: pointer;
}

input {
  width: 100%;
  box-sizing: border-box;
}

/* Status colors */
.status-dev {
  color: #3490dc;
  font-weight: bold;
}

.status-sme {
  color: goldenrod;
  font-weight: bold;
}

.status-published {
  color: green;
  font-weight: bold;
}

.status-enabled {
  color: green;
  font-weight: bold;
}
</style>
