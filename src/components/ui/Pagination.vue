<script lang="ts">
import { Component, Prop, Emit } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";

@Component({
  name: "Pagination",
})
export default class Pagination extends Vue {
  @Prop({ required: true })
  currentPage!: number;

  @Prop({ required: true })
  totalPages!: number;

  @Prop({ default: 10 })
  perPage!: number;

  @Prop({ default: 0 })
  total!: number;

  get pages() {
    const items = [];
    const maxPages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let end = Math.min(this.totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    return items;
  }

  @Emit("pageChange")
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      return page;
    }
  }
}
</script>

<template>
  <div class="pagination-wrapper">
    <div class="pagination-info">
      Affichage de {{ (currentPage - 1) * perPage + 1 }} à
      {{ Math.min(currentPage * perPage, total) }} sur {{ total }} résultats
    </div>

    <nav>
      <ul class="pagination mb-0">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="goToPage(currentPage - 1)">
            <i class="fas fa-chevron-left"></i>
          </a>
        </li>

        <li
          v-for="page in pages"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" @click="goToPage(page)">
            {{ page }}
          </a>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="goToPage(currentPage + 1)">
            <i class="fas fa-chevron-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-top: 1px solid #dee2e6;
}

.pagination-info {
  font-size: 0.875rem;
  color: #6c757d;
}

.page-link {
  cursor: pointer;
}
</style>
