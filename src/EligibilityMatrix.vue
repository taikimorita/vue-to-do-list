<template>
  <div class="eligibility-matrix">
    <div class="header-row">
      <h1 class="title">ESP Eligibility Matrix</h1>
    </div>
    <!-- data grid -->
    <DxDataGrid
      ref="gridRef"
      :data-source="rows"
      key-expr="id"
      show-borders="true"
      :editing="editing"
    >
      <!-- columns -->
      <DxColumn data-field="country" caption="Country" />
      <DxColumn data-field="file" caption="File" />
      <DxColumn data-field="description" caption="Description" />
      <DxColumn data-field="status" caption="Status" data-type="boolean" />
      <DxColumn data-field="CUSIPs" caption="CUSIPs" />
      <!-- EventType dropdown -->
      <DxColumn data-field="eventType" caption="Event Type">
        <DxLookup :data-source="eventTypeOptions" value-expr="value" display-expr="text" />
      </DxColumn>
      <!-- Custodian dropdown -->
      <DxColumn data-field="custodian" caption="Custodian">
        <DxLookup :data-source="custodianOptions" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="depositary" caption="Depositary" />
      <DxColumn data-field="effectiveStartDate" caption="Start Date" data-type="date" />
      <DxColumn data-field="effectiveEndDate" caption="End Date" data-type="date" />
      <!-- popup editing -->
      <DxEditing
        mode="popup"
        allow-adding="true"
        allow-updating="true"
        allow-deleting="false"
        :popup="popupOptions"
        :form="formOptions"
      />
      <!-- custom status template -->
      <template #statusCell="{ data }">
        <span :class="getStatusClass(data.status)"> {{ data.status }} </span>
      </template>
    </DxDataGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DxDataGrid, { DxColumn, DxEditing, DxLookup } from 'devextreme-vue/data-grid'
import DxButton from 'devextreme-vue/button'

const gridRef = ref(null)
const rows = ref([
  {
    id: 1,
    country: 'Australia',
    status: true,
    file: 'AU_20220101_1.pdf',
    description: 'General Eligibility Matrix for Australia.',
    exceptions: '',
    CUSIPs: '',
    eventType: 'Equity',
    custodian: '',
    depositary: '',
    effectiveStartDate: '2025-01-01',
    effectiveEndDate: '2025-06-30',
  },
  {
    id: 2,
    country: 'Austria',
    status: false,
    file: '',
    description: '',
    exceptions: '',
    CUSIPs: '',
    eventType: 'Equity',
    custodian: '',
    depositary: '',
    effectiveStartDate: '2025-03-01',
    effectiveEndDate: '2025-08-01',
  },
  {
    id: 3,
    country: 'Belgium',
    status: true,
    file: 'BE_20220101_1.pdf',
    description: 'Eligibility Matrix for Belgium events.',
    exceptions: '',
    CUSIPs: '',
    eventType: 'Debt',
    custodian: '',
    depositary: '',
    effectiveStartDate: '2025-02-15',
    effectiveEndDate: '2025-09-15',
  },
])
const custodianOptions = [
  { value: 'JPMorgan Chase', text: 'JPMorgan Chase' },
  { value: 'Wells Fargo', text: 'Wells Fargo' },
  { value: 'Goldman Sachs', text: 'Goldman Sachs' },
]
const eventTypeOptions = [
  { value: 'Equity', text: 'Equity' },
  { value: 'Debt', text: 'Debt' },
]
const editing = { mode: 'popup', allowAdding: true, allowUpdating: true, allowDeleting: true }
const popupOptions = { title: 'Add / Edit Row', showTitle: true, width: 700, height: 400 }
const formOptions = {
  colCount: 2,
  items: [
    'country',
    'status',
    'file',
    'description',
    {
      dataField: 'eventType',
      editorType: 'dxSelectBox',
      editorOptions: {
        items: eventTypeOptions,
        valueExpr: 'value',
        displayExpr: 'text',
        placeholder: 'Select Event Type',
      },
    },
    'CUSIPs',
    {
      dataField: 'custodian',
      editorType: 'dxSelectBox',
      editorOptions: {
        items: custodianOptions,
        valueExpr: 'value',
        displayExpr: 'text',
        placeholder: 'Select Custodian',
      },
    },
    'Depositary',
    'effectiveStartDate',
    'effectiveEndDate',
  ],
}
function addRow() {
  if (gridRef.value?.instance) {
    gridRef.value.instance.addRow()
  }
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
