<template>
  <div class="eligibility-matrix">
    <div class="header-row">
      <h1 class="title">ESP Eligibility Matrix</h1>
      <!-- Blue custom Add Row button -->
      <DxHeaderButton
        icon="add"
        text="Add Row"
        type="default"
        styling-mode="contained"
        @click="addRow"
      />
    </div>

    <DxDataGrid
      ref="gridRef"
      :data-source="rows"
      key-expr="id"
      show-borders="true"
      :show-borders="true"
      :show-row-lines="true"
      :word-wrap-enabled="true"
      :hover-state-enabled="true"
      :row-alternation-enabled="true"
    >
      <!-- columns (matrix stays the same) -->
      <DxColumn data-field="country" caption="Country" />
      <DxColumn data-field="file" caption="File" />
      <DxColumn data-field="description" caption="Description" />
      <DxColumn data-field="status" caption="Status" data-type="boolean" />
      <DxColumn data-field="CUSIPs" caption="CUSIPs" />
      <DxColumn data-field="eventType" caption="Event Type">
        <DxLookup :data-source="eventTypeOptions" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="custodian" caption="Custodian">
        <DxLookup :data-source="custodianOptions" value-expr="value" display-expr="text" />
      </DxColumn>
      <DxColumn data-field="depositary" caption="Depositary" />
      <DxColumn data-field="effectiveStartDate" caption="Start Date" data-type="date" />
      <DxColumn data-field="effectiveEndDate" caption="End Date" data-type="date" />

      <!-- command column: EDIT ONLY (no delete) -->
      <DxColumn type="buttons">
        <DxCommandButton name="edit" />
      </DxColumn>

      <!-- popup editing (no delete) -->
      <DxEditing
        mode="popup"
        :allow-adding="true"
        :allow-updating="true"
        :allow-deleting="false"
        :popup="popupOptions"
        :form="formOptions"
        :use-icons="true"
      />

      <!-- hide default white toolbar Add/Save/Revert buttons -->
      <DxToolbar>
        <DxItem name="addRowButton" :visible="false" />
        <DxItem name="saveButton" :visible="false" />
        <DxItem name="revertButton" :visible="false" />
      </DxToolbar>
    </DxDataGrid>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DxDataGrid, {
  DxColumn,
  DxEditing,
  DxLookup,
  DxToolbar,
  DxItem,
  DxButton as DxCommandButton,
} from 'devextreme-vue/data-grid'
import DxHeaderButton from 'devextreme-vue/button'
import DateRangeBox from 'devextreme/ui/date_range_box'
import 'devextreme/dist/css/dx.light.css'

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
    file: 'AT_20220101_1.pdf',
    description: 'General Eligibility Matrix for Austria.',
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
    description: 'General Eligibility Matrix for Belgium.',
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

const popupOptions = {
  title: 'Add / Edit Row',
  showTitle: true,
  width: 720,
  height: 440,
}

const formOptions = {
  colCount: 2,
  items: [
    'country',
    'status',
    'file',
    'description',
    'CUSIPs',
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
    'depositary',

    {
      itemType: 'simple',
      colSpan: 2,
      label: { text: 'Effective Date Range' },
      template: (data, itemElement) => {
        const host = document.createElement('div')
        host.style.width = '100%'
        itemElement.appendChild(host)

        const form = data.component
        const fd = form.option('formData') || {}

        const drb = new DateRangeBox(host, {
          value: [fd.effectiveStartDate, fd.effectiveEndDate],
          displayFormat: 'yyyy-MM-dd',
          showClearButton: true,
          width: '100%',
          onValueChanged: (e) => {
            const [start, end] = e.value || []
            const current = form.option('formData')
            current.effectiveStartDate = start || null
            current.effectiveEndDate = end || null
          },
        })

        return host
      },
    },
  ],
}

function addRow() {
  gridRef.value?.instance?.addRow()
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
</style>
