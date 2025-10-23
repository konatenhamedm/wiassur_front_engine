<!-- @ts-ignore -->
<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  FlexRender,
} from "@tanstack/vue-table";
import Button from "./Button.vue";

// Props
const props = withDefaults(
  defineProps<{
    data: any[];
    columns: ColumnDef<any, any>[];
    sortable?: boolean;
    filterable?: boolean;
    paginated?: boolean;
    pageSize?: number;
    hover?: boolean;
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    emptyMessage?: string;
  }>(),
  {
    sortable: true,
    filterable: true,
    paginated: true,
    pageSize: 10,
    hover: true,
    size: "md",
    loading: false,
    emptyMessage: "Aucune donnée disponible",
  }
);

// Table state
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: props.pageSize,
});

// Initialize table
const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get pagination() {
      return pagination.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    sorting.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting.value)
        : updaterOrValue;
  },
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },
  onPaginationChange: (updaterOrValue) => {
    pagination.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(pagination.value)
        : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.sortable ? getSortedRowModel() : undefined,
  getFilteredRowModel: props.filterable ? getFilteredRowModel() : undefined,
  getPaginationRowModel: props.paginated ? getPaginationRowModel() : undefined,
});

// Computed
const tableClasses = computed(() => ({
  "data-table--hover": props.hover,
  [`data-table--${props.size}`]: true,
  "data-table--loading": props.loading,
}));

const getSortIcon = (column: any) => {
  const isSorted = column.getIsSorted();
  if (!isSorted) return "fas fa-sort";
  return isSorted === "asc" ? "fas fa-sort-up" : "fas fa-sort-down";
};
</script>

<template>
  <div class="data-table-wrapper">
    <!-- Loading Overlay -->
    <div v-if="loading" class="data-table-loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="data-table" :class="tableClasses">
        <!-- Header -->
        <thead class="data-table__head">
          <tr
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="data-table__header-row"
          >
            <th
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="data-table__header-cell"
              :class="{
                'data-table__header-cell--sortable': header.column.getCanSort(),
              }"
              @click="
                header.column.getCanSort()
                  ? header.column.getToggleSortingHandler()?.($event)
                  : null
              "
            >
              <div class="data-table__header-content">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <i
                  v-if="sortable && header.column.getCanSort()"
                  :class="getSortIcon(header.column)"
                  class="data-table__sort-icon"
                ></i>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="data-table__body">
          <tr
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            class="data-table__row"
          >
            <td
              v-for="cell in row.getVisibleCells()"
              :key="cell.id"
              class="data-table__cell"
            >
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </td>
          </tr>

          <!-- Empty State -->
          <tr
            v-if="table.getRowModel().rows.length === 0"
            class="data-table__empty"
          >
            <td :colspan="columns.length" class="data-table__empty-cell">
              <div class="data-table__empty-content">
                <i class="fas fa-inbox"></i>
                <p>{{ emptyMessage }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      v-if="paginated && table.getPageCount() > 1"
      class="data-table-pagination"
    >
      <div class="data-table-pagination__info">
        Affichage de
        {{
          table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
          1
        }}
        à
        {{
          Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )
        }}
        sur {{ table.getFilteredRowModel().rows.length }} résultats
      </div>

      <div class="data-table-pagination__controls">
        <Button
          variant="light"
          size="sm"
          icon="fas fa-angle-double-left"
          @click="table.setPageIndex(0)"
          :disabled="!table.getCanPreviousPage()"
          title="Première page"
        />
        <Button
          variant="light"
          size="sm"
          icon="fas fa-angle-left"
          @click="table.previousPage()"
          :disabled="!table.getCanPreviousPage()"
          title="Page précédente"
        />

        <span class="data-table-pagination__page">
          Page {{ table.getState().pagination.pageIndex + 1 }} sur
          {{ table.getPageCount() }}
        </span>

        <Button
          variant="light"
          size="sm"
          icon="fas fa-angle-right"
          @click="table.nextPage()"
          :disabled="!table.getCanNextPage()"
          title="Page suivante"
        />
        <Button
          variant="light"
          size="sm"
          icon="fas fa-angle-double-right"
          @click="table.setPageIndex(table.getPageCount() - 1)"
          :disabled="!table.getCanNextPage()"
          title="Dernière page"
        />
      </div>

      <div class="data-table-pagination__page-size">
        <select
          :value="table.getState().pagination.pageSize"
          @change="
            table.setPageSize(
              Number(($event.target as HTMLSelectElement).value)
            )
          "
          class="form-select form-select-sm"
        >
          <option :value="5">5 / page</option>
          <option :value="10">10 / page</option>
          <option :value="20">20 / page</option>
          <option :value="50">50 / page</option>
          <option :value="100">100 / page</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   DATA TABLE WRAPPER
   ============================================ */

.data-table-wrapper {
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-theme);
}

/* ============================================
   LOADING
   ============================================ */

.data-table-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(var(--primary-rgb), 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  backdrop-filter: blur(4px);
  transition: background-color var(--transition-theme);
}

.data-table-loading .spinner-border {
  color: var(--primary);
  width: 3rem;
  height: 3rem;
  border-width: 0.3rem;
}

/* ============================================
   TABLE
   ============================================ */

.table-responsive {
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.data-table {
  width: 100%;
  margin-bottom: 0;
  color: var(--text-primary);
  background-color: var(--surface);
  border-collapse: collapse;
  transition: all var(--transition-theme);
}

.data-table--loading {
  opacity: 0.5;
  pointer-events: none;
}

/* ============================================
   HEADER
   ============================================ */

.data-table__head {
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    var(--bg-tertiary) 100%
  );
  transition: background var(--transition-theme);
}

.data-table__header-row {
  border-bottom: 2px solid var(--border-dark);
  transition: border-color var(--transition-theme);
}

.data-table__header-cell {
  padding: 1rem 1.25rem;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-align: left;
  transition: all var(--transition-theme);
  user-select: none;
  position: relative;
}

.data-table__header-cell::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  transition: width var(--transition-base);
}

.data-table__header-cell--sortable {
  cursor: pointer;
}

.data-table__header-cell--sortable:hover {
  background-color: var(--surface-hover);
  color: var(--primary);
}

.data-table__header-cell--sortable:hover::after {
  width: 100%;
}

.data-table__header-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: space-between;
}

.data-table__sort-icon {
  font-size: 0.75rem;
  color: var(--text-muted);
  transition: all var(--transition-base);
  opacity: 0.6;
}

.data-table__header-cell--sortable:hover .data-table__sort-icon {
  color: var(--primary);
  opacity: 1;
  transform: scale(1.2);
}

/* ============================================
   BODY
   ============================================ */

.data-table__body {
  background-color: var(--surface);
  transition: background-color var(--transition-theme);
}

.data-table__row {
  border-bottom: 1px solid var(--border-color);
  transition: all var(--transition-fast);
  background-color: transparent !important;
}

.data-table__row:last-child {
  border-bottom: none;
}

.data-table--hover .data-table__row:hover {
  background: linear-gradient(
    90deg,
    var(--surface-hover) 0%,
    var(--surface) 100%
  ) !important;
  transform: translateX(2px);
  box-shadow: -3px 0 0 var(--primary);
}

.data-table__cell {
  padding: 1rem 1.25rem;
  color: var(--text-primary);
  background-color: transparent !important;
  transition: all var(--transition-theme);
  vertical-align: middle;
}

/* ============================================
   SIZES
   ============================================ */

.data-table--sm .data-table__header-cell,
.data-table--sm .data-table__cell {
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
}

.data-table--md .data-table__header-cell,
.data-table--md .data-table__cell {
  padding: 1rem 1.25rem;
  font-size: 0.9rem;
}

.data-table--lg .data-table__header-cell,
.data-table--lg .data-table__cell {
  padding: 1.25rem 1.5rem;
  font-size: 1rem;
}

/* ============================================
   EMPTY STATE
   ============================================ */

.data-table__empty-cell {
  text-align: center;
  padding: 4rem 2rem !important;
  border-bottom: none !important;
  background: linear-gradient(
    135deg,
    var(--surface) 0%,
    var(--bg-secondary) 100%
  );
}

.data-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  color: var(--text-secondary);
}

.data-table__empty-content i {
  font-size: 3rem;
  opacity: 0.4;
  color: var(--text-muted);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}

.data-table__empty-content p {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
}

/* ============================================
   PAGINATION
   ============================================ */

.data-table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(
    135deg,
    var(--bg-secondary) 0%,
    var(--surface) 100%
  );
  border-top: 1px solid var(--border-color);
  flex-wrap: wrap;
  transition: all var(--transition-theme);
}

.data-table-pagination__info {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color var(--transition-theme);
}

.data-table-pagination__controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.data-table-pagination__page {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
  padding: 0 1rem;
  min-width: 120px;
  text-align: center;
  transition: color var(--transition-theme);
}

.data-table-pagination__page-size {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.data-table-pagination__page-size .form-select {
  width: auto;
  min-width: 120px;
  background-color: var(--surface);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 500;
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border-radius: var(--radius-md);
  transition: all var(--transition-theme);
  cursor: pointer;
}

.data-table-pagination__page-size .form-select:hover {
  border-color: var(--primary);
  background-color: var(--surface-hover);
}

.data-table-pagination__page-size .form-select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.15);
  outline: none;
}

/* ============================================
   RESPONSIVE
   ============================================ */

@media (max-width: 768px) {
  .data-table-pagination {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }

  .data-table-pagination__info,
  .data-table-pagination__page {
    text-align: center;
    width: 100%;
  }

  .data-table-pagination__controls {
    justify-content: center;
    width: 100%;
  }

  .data-table-pagination__page-size {
    justify-content: center;
    width: 100%;
  }

  .data-table__header-cell,
  .data-table__cell {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .data-table-wrapper {
    border-radius: var(--radius-md);
  }

  .data-table__empty-content {
    gap: 1rem;
  }

  .data-table__empty-content i {
    font-size: 2rem;
  }

  .data-table__empty-content p {
    font-size: 0.95rem;
  }
}
</style>
