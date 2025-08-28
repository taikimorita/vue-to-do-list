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
      <DxColumn data-field="description" caption="Description" :width="350" />
      <DxColumn data-field="status" caption="Status" data-type="boolean" :width="75" />
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
    country: 'AUSTRALIA',
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
    country: 'AUSTRIA',
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
    country: 'BELGIUM',
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

const countries = [
  {
    text: 'UNITED STATES OF AMERICA',
    value: 'US',
  },
  {
    text: 'CANADA',
    value: 'CA',
  },
  {
    text: 'AFGHANISTAN',
    value: 'AF',
  },
  {
    text: 'ALBANIA',
    value: 'AL',
  },
  {
    text: 'ALGERIA',
    value: 'DZ',
  },
  {
    text: 'AMERICAN SAMOA',
    value: 'AS',
  },
  {
    text: 'ANDORRA',
    value: 'AD',
  },
  {
    text: 'ANGOLA',
    value: 'AO',
  },
  {
    text: 'ANGUILLA',
    value: 'AI',
  },
  {
    text: 'ANTIGUA AND BARBUDA',
    value: 'AG',
  },
  {
    text: 'ARGENTINA',
    value: 'AR',
  },
  {
    text: 'ARMENIA',
    value: 'AM',
  },
  {
    text: 'ARUBA',
    value: 'AW',
  },
  {
    text: 'AUSTRALIA',
    value: 'AU',
  },
  {
    text: 'AUSTRIA',
    value: 'AT',
  },
  {
    text: 'AZERBAIJAN',
    value: 'AZ',
  },
  {
    text: 'BAHAMAS',
    value: 'BS',
  },
  {
    text: 'BAHRAIN',
    value: 'BH',
  },
  {
    text: 'BANGLADESH',
    value: 'BD',
  },
  {
    text: 'BARBADOS',
    value: 'BB',
  },
  {
    text: 'BELARUS',
    value: 'BY',
  },
  {
    text: 'BELGIUM',
    value: 'BE',
  },
  {
    text: 'BELIZE',
    value: 'BZ',
  },
  {
    text: 'BENIN',
    value: 'BJ',
  },
  {
    text: 'BERMUDA',
    value: 'BM',
  },
  {
    text: 'BHUTAN',
    value: 'BT',
  },
  {
    text: 'BOLIVIA (PLURINATIONAL STATE OF)',
    value: 'BO',
  },
  {
    text: 'BOSNIA AND HERZEGOVINA',
    value: 'BA',
  },
  {
    text: 'BOTSWANA',
    value: 'BW',
  },
  {
    text: 'BRAZIL',
    value: 'BR',
  },
  {
    text: 'BRUNEI DARUSSALAM',
    value: 'BN',
  },
  {
    text: 'BULGARIA',
    value: 'BG',
  },
  {
    text: 'BURKINA FASO',
    value: 'BF',
  },
  {
    text: 'BURUNDI',
    value: 'BI',
  },
  {
    text: 'CABO VERDE',
    value: 'CV',
  },
  {
    text: 'CAMBODIA',
    value: 'KH',
  },
  {
    text: 'CAMEROON',
    value: 'CM',
  },
  {
    text: 'CAYMAN ISLANDS',
    value: 'KY',
  },
  {
    text: 'CENTRAL AFRICAN REPUBLIC',
    value: 'CF',
  },
  {
    text: 'CHAD',
    value: 'TD',
  },
  {
    text: 'CHILE',
    value: 'CL',
  },
  {
    text: 'CHINA',
    value: 'CN',
  },
  {
    text: 'COLOMBIA',
    value: 'CO',
  },
  {
    text: 'COMOROS',
    value: 'KM',
  },
  {
    text: 'CONGO',
    value: 'CG',
  },
  {
    text: 'CONGO, DEMOCRATIC REPUBLIC OF THE',
    value: 'CD',
  },
  {
    text: 'COOK ISLANDS',
    value: 'CK',
  },
  {
    text: 'COSTA RICA',
    value: 'CR',
  },
  {
    text: "CÔTE D'IVOIRE",
    value: 'CI',
  },
  {
    text: 'CROATIA',
    value: 'HR',
  },
  {
    text: 'CUBA',
    value: 'CU',
  },
  {
    text: 'CURAÇAO',
    value: 'CW',
  },
  {
    text: 'CYPRUS',
    value: 'CY',
  },
  {
    text: 'CZECHIA',
    value: 'CZ',
  },
  {
    text: 'DENMARK',
    value: 'DK',
  },
  {
    text: 'DJIBOUTI',
    value: 'DJ',
  },
  {
    text: 'DOMINICA',
    value: 'DM',
  },
  {
    text: 'DOMINICAN REPUBLIC',
    value: 'DO',
  },
  {
    text: 'ECUADOR',
    value: 'EC',
  },
  {
    text: 'EGYPT',
    value: 'EG',
  },
  {
    text: 'EL SALVADOR',
    value: 'SV',
  },
  {
    text: 'EQUATORIAL GUINEA',
    value: 'GQ',
  },
  {
    text: 'ERITREA',
    value: 'ER',
  },
  {
    text: 'ESTONIA',
    value: 'EE',
  },
  {
    text: 'ESWATINI',
    value: 'SZ',
  },
  {
    text: 'ETHIOPIA',
    value: 'ET',
  },
  {
    text: 'FIJI',
    value: 'FJ',
  },
  {
    text: 'FINLAND',
    value: 'FI',
  },
  {
    text: 'FRANCE',
    value: 'FR',
  },
  {
    text: 'GABON',
    value: 'GA',
  },
  {
    text: 'GAMBIA',
    value: 'GM',
  },
  {
    text: 'GEORGIA',
    value: 'GE',
  },
  {
    text: 'GERMANY',
    value: 'DE',
  },
  {
    text: 'GHANA',
    value: 'GH',
  },
  {
    text: 'GIBRALTAR',
    value: 'GI',
  },
  {
    text: 'GREECE',
    value: 'GR',
  },
  {
    text: 'GREENLAND',
    value: 'GL',
  },
  {
    text: 'GRENADA',
    value: 'GD',
  },
  {
    text: 'GUAM',
    value: 'GU',
  },
  {
    text: 'GUATEMALA',
    value: 'GT',
  },
  {
    text: 'GUERNSEY',
    value: 'GG',
  },
  {
    text: 'GUINEA',
    value: 'GN',
  },
  {
    text: 'GUINEA-BISSAU',
    value: 'GW',
  },
  {
    text: 'GUYANA',
    value: 'GY',
  },
  {
    text: 'HAITI',
    value: 'HT',
  },
  {
    text: 'HOLY SEE',
    value: 'VA',
  },
  {
    text: 'HONDURAS',
    value: 'HN',
  },
  {
    text: 'HONG KONG',
    value: 'HK',
  },
  {
    text: 'HUNGARY',
    value: 'HU',
  },
  {
    text: 'ICELAND',
    value: 'IS',
  },
  {
    text: 'INDIA',
    value: 'IN',
  },
  {
    text: 'INDONESIA',
    value: 'ID',
  },
  {
    text: 'IRAN (ISLAMIC REPUBLIC OF)',
    value: 'IR',
  },
  {
    text: 'IRAQ',
    value: 'IQ',
  },
  {
    text: 'IRELAND',
    value: 'IE',
  },
  {
    text: 'ISLE OF MAN',
    value: 'IM',
  },
  {
    text: 'ISRAEL',
    value: 'IL',
  },
  {
    text: 'ITALY',
    value: 'IT',
  },
  {
    text: 'JAMAICA',
    value: 'JM',
  },
  {
    text: 'JAPAN',
    value: 'JP',
  },
  {
    text: 'JERSEY',
    value: 'JE',
  },
  {
    text: 'JORDAN',
    value: 'JO',
  },
  {
    text: 'KAZAKHSTAN',
    value: 'KZ',
  },
  {
    text: 'KENYA',
    value: 'KE',
  },
  {
    text: 'KIRIBATI',
    value: 'KI',
  },
  {
    text: "KOREA (THE DEMOCRATIC PEOPLE'S REPUBLIC OF)",
    value: 'KP',
  },
  {
    text: 'KOREA, REPUBLIC OF',
    value: 'KR',
  },
  {
    text: 'KOSOVO',
    value: 'XK',
  },
  {
    text: 'KUWAIT',
    value: 'KW',
  },
  {
    text: 'KYRGYZSTAN',
    value: 'KG',
  },
  {
    text: "LAO PEOPLE'S DEMOCRATIC REPUBLIC",
    value: 'LA',
  },
  {
    text: 'LATVIA',
    value: 'LV',
  },
  {
    text: 'LEBANON',
    value: 'LB',
  },
  {
    text: 'LESOTHO',
    value: 'LS',
  },
  {
    text: 'LIBERIA',
    value: 'LR',
  },
  {
    text: 'LIBYA',
    value: 'LY',
  },
  {
    text: 'LIECHTENSTEIN',
    value: 'LI',
  },
  {
    text: 'LITHUANIA',
    value: 'LT',
  },
  {
    text: 'LUXEMBOURG',
    value: 'LU',
  },
  {
    text: 'MACAO',
    value: 'MO',
  },
  {
    text: 'MADAGASCAR',
    value: 'MG',
  },
  {
    text: 'MALAWI',
    value: 'MW',
  },
  {
    text: 'MALAYSIA',
    value: 'MY',
  },
  {
    text: 'MALDIVES',
    value: 'MV',
  },
  {
    text: 'MALI',
    value: 'ML',
  },
  {
    text: 'MALTA',
    value: 'MT',
  },
  {
    text: 'MARSHALL ISLANDS',
    value: 'MH',
  },
  {
    text: 'MAURITANIA',
    value: 'MR',
  },
  {
    text: 'MAURITIUS',
    value: 'MU',
  },
  {
    text: 'MEXICO',
    value: 'MX',
  },
  {
    text: 'MICRONESIA (FEDERATED STATES OF)',
    value: 'FM',
  },
  {
    text: 'MOLDOVA, REPUBLIC OF',
    value: 'MD',
  },
  {
    text: 'MONACO',
    value: 'MC',
  },
  {
    text: 'MONGOLIA',
    value: 'MN',
  },
  {
    text: 'MONTENEGRO',
    value: 'ME',
  },
  {
    text: 'MONTSERRAT',
    value: 'MS',
  },
  {
    text: 'MOROCCO',
    value: 'MA',
  },
  {
    text: 'MOZAMBIQUE',
    value: 'MZ',
  },
  {
    text: 'MYANMAR',
    value: 'MM',
  },
  {
    text: 'NAMIBIA',
    value: 'NA',
  },
  {
    text: 'NAURU',
    value: 'NR',
  },
  {
    text: 'NEPAL',
    value: 'NP',
  },
  {
    text: 'NETHERLANDS',
    value: 'NL',
  },
  {
    text: 'NEW ZEALAND',
    value: 'NZ',
  },
  {
    text: 'NICARAGUA',
    value: 'NI',
  },
  {
    text: 'NIGER',
    value: 'NE',
  },
  {
    text: 'NIGERIA',
    value: 'NG',
  },
  {
    text: 'NIUE',
    value: 'NU',
  },
  {
    text: 'NORTH MACEDONIA',
    value: 'MK',
  },
  {
    text: 'NORTHERN MARIANA ISLANDS',
    value: 'MP',
  },
  {
    text: 'NORWAY',
    value: 'NO',
  },
  {
    text: 'OMAN',
    value: 'OM',
  },
  {
    text: 'PAKISTAN',
    value: 'PK',
  },
  {
    text: 'PALAU',
    value: 'PW',
  },
  {
    text: 'PALESTINE, STATE OF',
    value: 'PS',
  },
  {
    text: 'PANAMA',
    value: 'PA',
  },
  {
    text: 'PAPUA NEW GUINEA',
    value: 'PG',
  },
  {
    text: 'PARAGUAY',
    value: 'PY',
  },
  {
    text: 'PERU',
    value: 'PE',
  },
  {
    text: 'PHILIPPINES',
    value: 'PH',
  },
  {
    text: 'POLAND',
    value: 'PL',
  },
  {
    text: 'PORTUGAL',
    value: 'PT',
  },
  {
    text: 'PUERTO RICO',
    value: 'PR',
  },
  {
    text: 'QATAR',
    value: 'QA',
  },
  {
    text: 'ROMANIA',
    value: 'RO',
  },
  {
    text: 'RUSSIAN FEDERATION',
    value: 'RU',
  },
  {
    text: 'RWANDA',
    value: 'RW',
  },
  {
    text: 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA',
    value: 'SH',
  },
  {
    text: 'SAINT KITTS AND NEVIS',
    value: 'KN',
  },
  {
    text: 'SAINT LUCIA',
    value: 'LC',
  },
  {
    text: 'SAINT VINCENT AND THE GRENADINES',
    value: 'VC',
  },
  {
    text: 'SAMOA',
    value: 'WS',
  },
  {
    text: 'SAN MARINO',
    value: 'SM',
  },
  {
    text: 'SAO TOME AND PRINCIPE',
    value: 'ST',
  },
  {
    text: 'SAUDI ARABIA',
    value: 'SA',
  },
  {
    text: 'SENEGAL',
    value: 'SN',
  },
  {
    text: 'SERBIA',
    value: 'RS',
  },
  {
    text: 'SEYCHELLES',
    value: 'SC',
  },
  {
    text: 'SIERRA LEONE',
    value: 'SL',
  },
  {
    text: 'SINGAPORE',
    value: 'SG',
  },
  {
    text: 'SINT MAARTEN (DUTCH PART)',
    value: 'SX',
  },
  {
    text: 'SLOVAKIA',
    value: 'SK',
  },
  {
    text: 'SLOVENIA',
    value: 'SI',
  },
  {
    text: 'SOLOMON ISLANDS',
    value: 'SB',
  },
  {
    text: 'SOMALIA',
    value: 'SO',
  },
  {
    text: 'SOUTH AFRICA',
    value: 'ZA',
  },
  {
    text: 'SOUTH SUDAN',
    value: 'SS',
  },
  {
    text: 'SPAIN',
    value: 'ES',
  },
  {
    text: 'SPAIN (NAVARRA)',
    value: 'ES-NC',
  },
  {
    text: 'SRI LANKA',
    value: 'LK',
  },
  {
    text: 'SUDAN',
    value: 'SD',
  },
  {
    text: 'SURINAME',
    value: 'SR',
  },
  {
    text: 'SWEDEN',
    value: 'SE',
  },
  {
    text: 'SWITZERLAND',
    value: 'CH',
  },
  {
    text: 'SYRIAN ARAB REPUBLIC',
    value: 'SY',
  },
  {
    text: 'TAIWAN, PROVINCE OF CHINA',
    value: 'TW',
  },
  {
    text: 'TAJIKISTAN',
    value: 'TJ',
  },
  {
    text: 'TANZANIA, UNITED REPUBLIC OF',
    value: 'TZ',
  },
  {
    text: 'THAILAND',
    value: 'TH',
  },
  {
    text: 'TIMOR-LESTE',
    value: 'TL',
  },
  {
    text: 'TOGO',
    value: 'TG',
  },
  {
    text: 'TOKELAU',
    value: 'TK',
  },
  {
    text: 'TONGA',
    value: 'TO',
  },
  {
    text: 'TRINIDAD AND TOBAGO',
    value: 'TT',
  },
  {
    text: 'TUNISIA',
    value: 'TN',
  },
  {
    text: 'TURKEY',
    value: 'TR',
  },
  {
    text: 'TURKMENISTAN',
    value: 'TM',
  },
  {
    text: 'TURKS AND CAICOS ISLANDS',
    value: 'TC',
  },
  {
    text: 'TUVALU',
    value: 'TV',
  },
  {
    text: 'UGANDA',
    value: 'UG',
  },
  {
    text: 'UKRAINE',
    value: 'UA',
  },
  {
    text: 'UNITED ARAB EMIRATES',
    value: 'AE',
  },
  {
    text: 'UNITED KINGDOM',
    value: 'GB',
  },
  {
    text: 'URUGUAY',
    value: 'UY',
  },
  {
    text: 'UZBEKISTAN',
    value: 'UZ',
  },
  {
    text: 'VANUATU',
    value: 'VU',
  },
  {
    text: 'VENEZUELA (BOLIVARIAN REPUBLIC OF)',
    value: 'VE',
  },
  {
    text: 'VIET NAM',
    value: 'VN',
  },
  {
    text: 'VIRGIN ISLANDS (BRITISH)',
    value: 'VG',
  },
  {
    text: 'VIRGIN ISLANDS (U.S.)',
    value: 'VI',
  },
  {
    text: 'WALLIS AND FUTUNA',
    value: 'WF',
  },
  {
    text: 'YEMEN',
    value: 'YE',
  },
  {
    text: 'ZAMBIA',
    value: 'ZM',
  },
  {
    text: 'ZIMBABWE',
    value: 'ZW',
  },
]

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
    {
      dataField: 'country',
      editorType: 'dxSelectBox',
      editorOptions: {
        items: countries,
        valueExpr: 'text',
        displayExpr: 'text',
        placeholder: 'Select Country',
        searchEnabled: true,
        dropDownOptions: {
          height: 200,
        },
      },
    },
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

.eligibility-matrix {
  padding: 20px;
}
</style>

<style>
#app {
  max-width: initial !important;
}
</style>
