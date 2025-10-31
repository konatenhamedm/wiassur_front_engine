<script lang="ts">
// @ts-ignore
// import { wiassurApi } from "@/services/api/wiassur";
import { ref } from "vue";
import { Insurer } from "@/types";
import TanStackDataTable from "@/components/ui/TanStackDataTable.vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardBody from "@/components/ui/CardBody.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { Component, Vue } from "vue-facing-decorator";

import data from "@/data/insurer-list.json";

// const fetchInsurers = async () => {
//   const response = await wiassurApi.getInsurers();
//   if (response.success) {
//     // @ts-ignore
//     const data = response.data.insurers;
//     // @ts-ignore
//     const insurers = data.map((insurer: any) => ({
//       id: insurer.id,
//       name: insurer.name,
//       description: insurer.description,
//     }));
//     // Update the ref with the fetched data
//     // @ts-ignore
//     ref.insurers = data;
//   }
// };

// fetchInsurers();

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
export default class ConfigurationInsurerList extends Vue {
  declare $router: any;

  insurers = ref<Insurer[]>(data.insurers as Insurer[]);

  private columns: ColumnDef<Insurer>[] = [
    {
      header: "Label",
      accessorKey: "label",
    },
    {
      header: "Code",
      accessorKey: "slug",
    },
    {
      header: "Code compagnie",
      accessorKey: "codeCompagnie",
    },
    {
      header: "Code autorisation",
      accessorKey: "codeAutorisation",
    },
    {
      header: "Uuid",
      accessorKey: "uuid",
    },
    {
      header: "Image",
      accessorKey: "photo",
    },
  ];
}
</script>

<template>
  <!-- <div class="container py-4">
    <TanStackDataTable :columns="columns" :data="insurers" />
  </div> -->

  <div class="container-fluid p-4">
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">Liste des assureurs</h4>
        </div>
      </CardHeader>
      <CardBody>
        <!-- :data="currentCategory ? currentCategory.branches : []" -->
        <TanStackDataTable
          :columns="columns"
          :data="insurers"
          :pagination="{ pageSize: 10 }"
          class="mb-4"
        />
      </CardBody>
    </Card>
  </div>
</template>
