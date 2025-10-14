<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  data: Array,
  columns: Array,
  themeColor: { type: String, default: '#008b8b' },
})

const globalSearch = ref('')
const columnFilters = ref({})
const sortKey = ref('')
const sortAsc = ref(true)
const page = ref(1)
const perPage = 10
const sortAnnouncement = ref('')

watch(
  () => props.columns,
  (cols) => {
    columnFilters.value = Object.fromEntries(cols.map((c) => [c.key, '']))
  },
  { immediate: true },
)

const filteredData = computed(() =>
  props.data
    .filter((row) =>
      Object.values(row).some((v) =>
        v.toString().toLowerCase().includes(globalSearch.value.toLowerCase()),
      ),
    )
    .filter((row) =>
      Object.entries(columnFilters.value).every(([key, val]) =>
        row[key].toString().toLowerCase().includes(val.toLowerCase()),
      ),
    ),
)

const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value
  return [...filteredData.value].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return sortAsc.value ? -1 : 1
    if (a[sortKey.value] > b[sortKey.value]) return sortAsc.value ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / perPage))
const paginatedData = computed(() => {
  const start = (page.value - 1) * perPage
  return sortedData.value.slice(start, start + perPage)
})

const toggleSort = (key) => {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = true
  }
  const direction = sortAsc.value ? 'ascending' : 'descending'
  sortAnnouncement.value = `Sorted by ${key} in ${direction} order.`
}

const ariaSort = (key) => {
  if (sortKey.value !== key) return 'none'
  return sortAsc.value ? 'ascending' : 'descending'
}

const nextPage = () => {
  if (page.value < totalPages.value) page.value++
}
const prevPage = () => {
  if (page.value > 1) page.value--
}
</script>

<template>
  <div class="table-wrap">
    <div class="search-bar mb-3">
      <input
        v-model="globalSearch"
        type="text"
        class="form-control"
        placeholder="🔍 Search all columns..."
        aria-label="Global search"
      />
    </div>

    <div class="table-responsive">
      <table class="data-table table align-middle" aria-label="Data table">
        <thead class="table-light">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              class="sortable"
              @click="toggleSort(col.key)"
              :aria-sort="ariaSort(col.key)"
              tabindex="0"
              scope="col"
            >
              {{ col.label }}
              <span class="sort-icon" v-if="sortKey === col.key">
                {{ sortAsc ? '▲' : '▼' }}
              </span>
              <span class="sort-hint" v-else>⇅</span>
            </th>
          </tr>
          <tr>
            <th v-for="col in columns" :key="col.key">
              <input
                v-model="columnFilters[col.key]"
                type="text"
                class="col-filter"
                :placeholder="`Filter ${col.label}`"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in paginatedData" :key="i">
            <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td :colspan="columns.length" class="text-center text-muted py-3">
              No matching records found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination mt-3">
      <button @click="prevPage" :disabled="page === 1">‹</button>
      <span>Page {{ page }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="page === totalPages">›</button>
    </div>

    <div class="sr-only" aria-live="polite">
      {{ sortAnnouncement }}
    </div>
  </div>
</template>

<style scoped>
.table-wrap {
  background: #ffffff;
  padding: 24px;
  border-radius: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
  font-family: 'Poppins', sans-serif;
  color: #073b6b;
}

.search-bar input {
  border-radius: 10px;
  padding: 10px 14px;
  border: 1px solid #b2d8d8;
  font-size: 1rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 14px;
  overflow: hidden;
  table-layout: fixed;
}

th,
td {
  text-align: left;
  padding: 12px 14px;
  border-bottom: 1px solid #e2e2e2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

th {
  background-color: rgba(0, 139, 139, 0.08);
  color: v-bind(themeColor);
  font-weight: 700;
  position: relative;
  transition: background 0.2s ease;
}
th:hover {
  background-color: rgba(0, 139, 139, 0.15);
  cursor: pointer;
}

.sort-icon,
.sort-hint {
  font-size: 0.9rem;
  margin-left: 6px;
  color: v-bind(themeColor);
  opacity: 0.8;
}
.sort-icon.active,
.sort-hint.active {
  opacity: 1;
}

.col-filter {
  width: 100%;
  padding: 6px;
  font-size: 0.9rem;
  border-radius: 10px;
  border: 1px solid #b2d8d8;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  color: #ffffff;
  background: v-bind(themeColor);
  border: none;
  font-weight: 600;
  border-radius: 6px;
  padding: 6px 12px;
  cursor: pointer;
  transition:
    background 0.2s ease,
    opacity 0.2s ease;
}
.pagination button:hover {
  opacity: 0.9;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination span {
  color: #073b6b;
  font-weight: 600;
}

[aria-live='polite'] {
  position: absolute;
  left: -9999px;
}
</style>
