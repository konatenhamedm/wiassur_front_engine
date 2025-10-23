<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";
import { useAuthStore } from "@/stores/auth";
import { getAccessibleMenus } from "@/router/Menu";
import NavLink from "./NavLink.vue";
import NavMenuParent from "./NavMenuParent.vue";

@Component({
  name: "AppSidebar",
  components: {
    NavLink,
    NavMenuParent,
  },
})
export default class AppSidebar extends Vue {
  @Prop({ default: false })
  collapsed!: boolean;

  expandedMenus: string[] = [];

  get authStore() {
    return useAuthStore();
  }

  get accessibleMenus() {
    const userRoles =
      this.authStore.user?.roles?.map((r: any) => r.code || r) || [];
    return getAccessibleMenus(userRoles);
  }

  toggleSubmenu(menuName: string) {
    const index = this.expandedMenus.indexOf(menuName);
    if (index > -1) {
      this.expandedMenus.splice(index, 1);
    } else {
      this.expandedMenus.push(menuName);
    }
  }

  isSubmenuExpanded(menuName: string) {
    return this.expandedMenus.includes(menuName);
  }
}
</script>

<template>
  <aside class="app-sidebar" :class="{ collapsed: collapsed }">
    <div class="sidebar-header">
      <img class="logo" src="@/assets/logo.svg" alt="" />
      <h3 v-if="!collapsed">Backend</h3>
    </div>

    <nav class="sidebar-nav">
      <template v-for="menu in accessibleMenus" :key="menu.name">
        <!-- Menu sans sous-menus -->
        <NavLink
          v-if="!menu.subMenus || menu.subMenus.length === 0"
          :to="menu.path"
          :icon="menu.icon"
          :label="menu.label"
        />

        <!-- Menu avec sous-menus -->
        <NavMenuParent
          v-else
          :name="menu.name"
          :icon="menu.icon"
          :label="menu.label"
          :is-expanded="isSubmenuExpanded(menu.name)"
          :is-collapsed="collapsed"
          @toggle="toggleSubmenu(menu.name)"
        >
          <NavLink
            v-for="submenu in menu.subMenus"
            :key="submenu.name"
            :to="submenu.path"
            :icon="submenu.icon"
            :label="submenu.label"
            is-submenu
          />
        </NavMenuParent>
      </template>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 260px;
  background: var(--surface);
  color: var(--text-primary);
  transition: width 0.3s ease, background-color 0.3s ease;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-lg);
  border-right: 1px solid var(--border-color);
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
}

.app-sidebar.collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 1rem;
  /* border-bottom: 1px solid var(--border-color); */
  text-align: center;
  background: var(--surface);
  min-height: 60px;
  display: flex;
  align-items: center;
}

.sidebar-header .logo {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.sidebar-header h3 {
  margin: 0;
  font-size: 1rem;
  color: var(--primary);
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0.5rem;
  overflow-y: auto;
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--radius-sm);
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>
