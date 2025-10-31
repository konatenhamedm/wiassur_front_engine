<script lang="ts">
// @ts-ignore
import { Component, Ref } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Card from "@/components/ui/Card.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import CardBody from "@/components/ui/CardBody.vue";
import Button from "@/components/ui/Button.vue";
import TanStackDataTable from "@/components/ui/TanStackDataTable.vue";
import data from "@/data/branch-category-list.json";
import { Category } from "@/types";
import type { ColumnDef } from "@tanstack/vue-table";
import { ref } from "vue";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";

@Component({
  name: "BranchCategoryList",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
    TanStackDataTable,
  },
})
export default class BranchCategoryList extends Vue {
  declare $router: any;
  // Categories data
  categories: Category[] = data.categories;

  // Current category
  currentCategory: Category = ref<Category>(this.categories[0] as Category);

  private columns: ColumnDef[] = [
    {
      header: "Label",
      accessorKey: "label",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Uuid",
      accessorKey: "uuid",
    },
  ];

  onCurrentCategorieChange = (e: any) => {
    this.currentCategory.value = this.categories.find(
      (categorie) => categorie.uuid == e.target.value
    );
  };
}
</script>

<template>
  <div class="container-fluid p-4">
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Liste des branches par catégorie</h4>

          <div class="d-flex gap-4">
            <!-- Label for Select the catedory -->
            <!-- <span class="me-2">Catégorie</span> -->

            <!-- Select the catedory -->
            <select
              class="form-select form-select-sm w-auto"
              @change="onCurrentCategorieChange"
            >
              <option
                v-for="categorie in categories"
                :key="categorie.uuid"
                :value="categorie.uuid"
              >
                {{ categorie.label }}
              </option>
            </select>

            <Button variant="primary" size="sm">
              <!-- @click="$router.push('/configuration/branch/create')" -->
              Nouvelle branche
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <!-- :data="currentCategory ? currentCategory.branches : []" -->
        <TanStackDataTable
          :columns="columns"
          :data="this.currentCategory.branches"
          :pagination="{ pageSize: 10 }"
          class="mb-4"
        />
      </CardBody>
    </Card>
  </div>
</template>
