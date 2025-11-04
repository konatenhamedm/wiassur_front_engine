<script lang="ts">
// @ts-ignore
import MethodActionsCell from "@/components/engine/MethodActionsCell.vue";
import Button from "@/components/ui/Button.vue";
import Card from "@/components/ui/Card.vue";
import CardBody from "@/components/ui/CardBody.vue";
import CardHeader from "@/components/ui/CardHeader.vue";
import TanStackDataTable from "@/components/ui/TanStackDataTable.vue";
import data from "@/data/insurer-list.json";
import Engine from "@/entity/Engine";
import { mosaicApi } from "@/services/api/mosaic";
import { EngineMethod } from "@/types";
import type { ColumnDef } from "@tanstack/vue-table";
import { h } from "vue";
import { Component, Vue } from "vue-facing-decorator";

// import data from "@/data/engineMethod-list.json";

const fetchEngineMethods = async (branchSlug: string) => {
  const response = await mosaicApi.getEngineMethods(branchSlug);
  const res: any = response;

  if (res && res.code === 200) {
    // @ts-ignore
    const data = res.data;

    // map server payload to EngineMethod shape
    // @ts-ignore
    const mapped: EngineMethod[] = data.map((engineMethod: any) => ({
      id: engineMethod.id,
      name: engineMethod.name,
      code: engineMethod.code,
      description: engineMethod.description,
      active: engineMethod.active,
      engine: engineMethod.engine,
    }));

    return mapped;
  }

  return [] as EngineMethod[];
};

@Component({
  name: "ConfigurationEngineMethodList",
  components: {
    Card,
    CardHeader,
    CardBody,
    Button,
    TanStackDataTable,
  },
})
export default class ConfigurationEngineMethodList extends Vue {
  declare $router: any;
  declare $route: any;

  // store engine methods as a plain array so template unwraps correctly
  public engineMethods: EngineMethod[] = [];
  public engine: Engine = null;

  public insurers = data.insurers;

  // dropdown state
  public dropdownOpen: boolean = false;
  public selectedInsurerUuid: string = "";
  public searchQuery: string = "";

  get selectedInsurerLabel(): string | null {
    if (!this.selectedInsurerUuid) return null;
    const it = this.insurers.find(
      (i: any) => i.uuid === this.selectedInsurerUuid
    );
    return it ? it.label : null;
  }

  get filteredInsurers(): any[] {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.insurers;
    return this.insurers.filter(
      (i: any) =>
        String(i.label || "")
          .toLowerCase()
          .includes(q) ||
        String(i.uuid || "")
          .toLowerCase()
          .includes(q)
    );
  }

  public selectInsurer(uuid: string) {
    this.selectedInsurerUuid = uuid;
    this.dropdownOpen = false;
    // keep external behavior identical
    // if the component already defines onCurrentInsurerChange, call it with the event-like or value
    // @ts-ignore
    if (typeof (this as any).onCurrentInsurerChange === "function") {
      // Call with value only since original handler relied on event.target.value
      (this as any).onCurrentInsurerChange(uuid);
    }
  }

  onCurrentInsurerChange = (value: string) => {
    // this.currentInsurer.value = this.categories
    //   .flatMap((category) => category.branches)
    //   .find((branch) => branch.uuid === value);

    fetchEngineMethods(value);
  };

  // fetchInsurers = async (id?: string) => {
  //   // alert(id);
  //   const response = id
  //     ? await mosaicApi.getOneInsurere(id)
  //     : await mosaicApi.get();
  //   if (response.code === 200) {
  //     // @ts-ignore
  //     const data = response.data;

  //     // Update the ref with the fetched data
  //     // @ts-ignore
  //     this.branches.value = data;
  //   }
  // };

  public columns: ColumnDef<EngineMethod>[] = [
    {
      header: "Nom",
      accessorKey: "name",
    },
    {
      header: "Code",
      accessorKey: "code",
    },
    {
      header: "Description",
      accessorKey: "description",
    },

    // Buttons show, edit and delete
    {
      id: "actions",
      header: "Actions",
      accessorKey: "actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => h(MethodActionsCell, { method: row.original }),
    },
  ];

  mounted() {
    // fetch engine methods when the component is mounted
    const branchSlug = this.$route.params.branchSlug as string;
    // assign the returned array to the reactive class property
    fetchEngineMethods(branchSlug).then((mapped) => {
      this.engineMethods = mapped;
      this.engine = new Engine(mapped[0].engine);
    });
  }
}
</script>

<template>
  <div class="container-fluid p-4 d-flex flex-column gap-2">
    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center gap-4">
          <div class="d-flex gap-2 align-items-center">
            <Button
              variant="light"
              size="sm"
              icon="fas fa-arrow-left"
              @click="$router.push('/configuration/engine-branches')"
              title="Retour aux engines"
              class="me-2"
            >
              Retour aux engines
            </Button>

            <h6 class="mb-0"><i class="fas fa-cogs"></i> {{ engine.name }}</h6>
          </div>
        </div>
      </CardHeader>
      <CardBody class="p-0"> </CardBody>
    </Card>

    <Card class="mb-4">
      <CardHeader>
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="mb-0">
            <i class="fa fa-building"></i> Liste des méthodes
          </h4>

          <div class="dropdown position-relative">
            <button
              class="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              @click="
                dropdownOpen = !dropdownOpen;
                if (dropdownOpen)
                  $nextTick(() => {
                    searchQuery = '';
                  });
              "
            >
              <img
                v-if="selectedInsurerUuid"
                src="/src/assets/img/insurer.png"
                alt=""
                style="width: 18px; height: 18px"
              />
              <span>{{ selectedInsurerLabel || "Globales" }}</span>
            </button>
            <ul
              v-show="dropdownOpen"
              class="dropdown-menu show p-1"
              style="
                max-height: 400px;
                overflow: auto;
                position: absolute;
                right: 0;
                top: 100%;
                width: 260px;
              "
            >
              <li class="p-2">
                <input
                  v-model="searchQuery"
                  type="text"
                  class="form-control rounded"
                  placeholder="Rechercher..."
                  @keydown.stop
                />
              </li>
              <li>
                <a
                  href="#"
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click.prevent="selectInsurer('')"
                >
                  <span>Globales</span>
                </a>
              </li>
              <!-- divider -->
              <li class="dropdown-divider">Assureurs</li>
              <li v-for="insurer in filteredInsurers" :key="insurer.uuid">
                <a
                  href="#"
                  class="dropdown-item d-flex align-items-center gap-2"
                  @click.prevent="selectInsurer(insurer.uuid)"
                >
                  <img
                    src="/src/assets/img/insurer.png"
                    alt=""
                    style="width: 18px; height: 18px"
                  />
                  <span>{{ insurer.label }}</span>
                </a>
              </li>
              <li
                v-if="filteredInsurers.length === 0"
                class="px-3 py-2 text-muted small"
              >
                Aucun résultat
              </li>
            </ul>
          </div>
        </div>
      </CardHeader>
      <CardBody class="" style="min-height: 60vh">
        <!-- :data="currentCategory ? currentCategory.branches : []" -->
        <TanStackDataTable
          :columns="columns"
          :data="engineMethods"
          :pagination="{ pageSize: 10 }"
          class="mb-4"
        />
      </CardBody>
    </Card>
  </div>
</template>
