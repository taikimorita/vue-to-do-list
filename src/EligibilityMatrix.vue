<template>
  <div class="eligibility-matrix">
    <div class="header-row">
      <h1 class="title">ESP Eligibility Matrix</h1>
      <DxButton icon="add" text="Add Row" type="default" styling-mode="contained" @click="addRow" />
    </div>

    <!-- data grid -->
    <DxDataGrid :data-source="rows" key-expr="id" show-borders="true" :editing="editing">
      <!-- columns -->
      <DxColumn data-field="country" caption="Country" />
      <DxColumn data-field="status" caption="Status" cell-template="statusCell" />
      <DxColumn data-field="file" caption="File" />
      <DxColumn data-field="description" caption="Description" />
      <DxColumn caption="" data-field="blank1" />
      <DxColumn data-field="type" caption="Type" />
      <DxColumn caption="" data-field="blank2" />
      <DxColumn data-field="custodian" caption="Custodian" />

      <!-- popup editing -->
      <DxEditing
        mode="popup"
        allow-adding="true"
        allow-updating="true"
        allow-deleting="true"
        :popup="popupOptions"
        :form="formOptions"
      />

      <!-- custom status template -->
      <template #statusCell="{ data }">
        <span :class="getStatusClass(data.status)">
          {{ data.status }}
        </span>
      </template>
    </DxDataGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DxDataGrid, { DxColumn, DxEditing } from 'devextreme-vue/data-grid'
import DxButton from 'devextreme-vue/button'

const rows = ref([
  {
    id: 1,
    country: 'Australia',
    status: 'DEV',
    file: '.pdf',
    description: '',
    blank1: '',
    type: 'ENABLED',
    blank2: '',
    custodian: '',
  },
  {
    id: 2,
    country: 'Austria',
    status: 'WITH SME',
    file: '.pdf',
    description: '',
    blank1: '',
    type: 'ENABLED',
    blank2: '',
    custodian: '',
  },
  {
    id: 3,
    country: 'Belgium',
    status: 'PUBLISHED',
    file: '.pdf',
    description: '',
    blank1: '',
    type: 'ENABLED',
    blank2: '',
    custodian: '',
  },
])

const editing = {
  mode: 'popup',
  allowAdding: true,
  allowUpdating: true,
  allowDeleting: true,
}

const popupOptions = {
  title: 'Add / Edit Row',
  showTitle: true,
  width: 700,
  height: 400,
}

const formOptions = {
  colCount: 2,
  items: ['country', 'status', 'file', 'description', 'blank1', 'type', 'blank2', 'custodian'],
}

function addRow() {
  // triggers popup to add a new row
}

function getStatusClass(status) {
  if (status === 'DEV') return 'status-dev'
  if (status === 'WITH SME') return 'status-sme'
  if (status === 'PUBLISHED') return 'status-published'
  return ''
}
</script>

<style scoped>
.eligibility-matrix {
  padding: 20px;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}
.toolbar {
  text-align: right;
  margin-bottom: 10px;
}

/* status colors */
.status-dev {
  color: blue;
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
</style>
