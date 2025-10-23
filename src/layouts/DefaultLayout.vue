<script lang="ts">
// @ts-ignore
import { Component } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import AppHeader from '@/components/ui/AppHeader.vue'
import AppSidebar from '@/components/ui/AppSidebar.vue'

@Component({
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar
  }
})
export default class DefaultLayout extends Vue {
  sidebarCollapsed = false

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed
  }
}
</script>

<template>
  <div class="default-layout">
    <!-- Sidebar -->
    <AppSidebar :collapsed="sidebarCollapsed" />

    <!-- Main Content -->
    <div class="main-wrapper">
      <!-- Header -->
      <AppHeader :sidebar-collapsed="sidebarCollapsed" @toggle-sidebar="toggleSidebar" />

      <!-- Page Content -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-secondary);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--bg-secondary);
  transition: background-color 0.3s ease;
}

.content {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-secondary);
}
</style>
