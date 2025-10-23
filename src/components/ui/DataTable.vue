<script lang="ts">
import { Component, Prop, Emit } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";

export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  class?: string;
}

@Component({
  name: "DataTable",
})
export default class DataTable extends Vue {
  @Prop({ required: true })
  columns!: Column[];

  @Prop({ required: true })
  data!: any[];

  @Prop({ default: false })
  loading!: boolean;

  @Prop({ default: "Aucune donnée disponible" })
  emptyMessage!: string;

  @Emit("rowClick")
  handleRowClick(item: any) {
    return item;
  }

  @Emit("sort")
  handleSort(column: Column) {
    if (column.sortable) {
      return column;
    }
  }
}
</script>

<template>
  <div class="data-table">
    <div v-if="loading" class="text-center py-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
    </div>

    <table v-else class="table table-hover">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="[column.class, { sortable: column.sortable }]"
            @click="handleSort(column)"
          >
            {{ column.label }}
            <i v-if="column.sortable" class="fas fa-sort ms-2"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="text-center text-muted">
            {{ emptyMessage }}
          </td>
        </tr>
        <tr
          v-for="(item, index) in data"
          :key="index"
          @click="handleRowClick(item)"
          class="cursor-pointer"
        >
          <td v-for="column in columns" :key="column.key" :class="column.class">
            <slot :name="`cell-${column.key}`" :item="item">
              {{ item[column.key as keyof T] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-table {
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
}

.table {
  margin: 0;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background-color: #f8f9fa;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
