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
import { Branch, Category } from "@/types";
import type { ColumnDef } from "@tanstack/vue-table";
import { ref } from "vue";
import { a } from "vitest/dist/chunks/suite.d.FvehnV49.js";
import Engine from "@/entity/Engine";
import { mosaicApi } from "@/services/api/mosaic";

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
  currentBranch: Branch = ref<Branch>(this.categories[0].branches[0] as Branch);

  // Current category
  branches: Branch = ref<Branch[]>([]);

  private columns: ColumnDef[] = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  onCurrentBranchChange = (e: any) => {
    this.currentBranch.value = this.categories
      .flatMap((category) => category.branches)
      .find((branch) => branch.uuid === e.target.value);

    this.fetchBranches(e.target.value);
  };

  fetchBranches = async (id?: string) => {
    // alert(id);
    const response = id
      ? await mosaicApi.getOneBranche(id)
      : await mosaicApi.getBranches();
    if (response.code === 200) {
      // @ts-ignore
      const data = response.data;

      // Update the ref with the fetched data
      // @ts-ignore
      this.branches.value = data;
    }
  };

  mounted() {
    this.fetchBranches();
  }
}
</script>

<template>
  <div class="container-fluid p-4">
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Liste des moteurs</h4>

          <div class="d-flex gap-4">
            <!-- Label for Select the catedory -->
            <!-- <span class="me-2">Catégorie</span> -->

            <!-- Select the catedory -->
            <select
              class="form-select form-select-sm w-auto"
              @change="onCurrentBranchChange"
            >
              <option value="">Toutes les branches</option>
              <optgroup
                v-for="categorie in categories"
                :key="categorie.uuid"
                :label="categorie.label"
              >
                <option
                  v-for="branch in categorie.branches"
                  :key="branch.uuid"
                  :value="branch.uuid"
                >
                  {{ branch.label }}
                </option>
              </optgroup>
            </select>

            <Button variant="primary" size="sm">
              <!-- @click="$router.push('/configuration/branch/create')" -->
              Nouvelle engine
            </Button>
          </div>
        </div>
      </CardHeader>
      <!-- <CardBody> -->
      <!-- :data="currentBranch ? currentBranch.branches : []" -->
      <!-- <TanStackDataTable
          :columns="columns"
          :data="this.branches"
          :pagination="{ pageSize: 10 }"
          class="mb-4"
        /> -->
      <!-- </CardBody> -->
    </Card>
    <div class="row">
      <div class="col-md-2" v-for="branch in branches" :key="branch.uuid">
        <div
          class="card border-0 shadow-sm cursor-pointer"
          @click="$router.push(`/configuration/engine/${branch.uuid}`)"
        >
          <div class="card-body text-center">
            <div>
              <p class="text-primary mb-1 p-3">
                <i class="fa fa-cogs fa-3x"></i>
              </p>
              <h5 class="mb-0">{{ branch.name }}</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Else -->
      <div class="col-md-12" v-if="branches.length === 0">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="p-3">
              <i class="fas fa-inbox fa-3x mb-3"></i>
              <h6>Aucune donnée disponible</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.cursor-pointer:hover {
  /* Slide up */
  transform: translateY(-5px);
  transition: transform 0.3s ease-in-out;
}
</style>
