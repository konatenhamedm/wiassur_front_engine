<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

@Component({
  name: "AppHeader",
  emits: ["toggle-sidebar"],
})
export default class AppHeader extends Vue {
  @Prop({ type: Boolean, default: false })
  sidebarCollapsed!: boolean;

  private router = useRouter();
  private authStore = useAuthStore();

  get user() {
    return this.authStore.user;
  }

  get tenant() {
    return this.authStore.currentTenant;
  }

  async handleLogout() {
    await this.authStore.logout();
    this.router.push("/login");
  }

  toggleSidebar() {
    this.$emit("toggle-sidebar");
  }
}
</script>

<template>
  <header class="app-header">
    <button @click="toggleSidebar" class="btn btn-link toggle-btn">
      <i class="fas fa-bars"></i>
    </button>

    <div class="header-right">
      <div v-if="tenant" class="tenant-badge">
        <i class="fas fa-building me-1"></i>
        {{ tenant.name }}
      </div>

      <div class="user-menu dropdown">
        <button
          class="btn btn-link dropdown-toggle user-btn"
          data-bs-toggle="dropdown"
        >
          <i class="fas fa-user-circle me-2"></i>
          <span class="user-name">{{ user?.firstName || user?.username }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <a class="dropdown-item" href="#"
              ><i class="fas fa-user me-2"></i>Profil</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#"
              ><i class="fas fa-cog me-2"></i>Paramètres</a
            >
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item text-danger" @click="handleLogout"
              ><i class="fas fa-sign-out-alt me-2"></i>Déconnexion</a
            >
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  height: 60px;
  background: var(--surface);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 100;
}

.toggle-btn {
  color: var(--text-primary);
  font-size: 1.25rem;
  /* padding: 0.5rem; */
  transition: color 0.2s ease;
}

.toggle-btn:hover {
  color: var(--primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.tenant-badge {
  background: var(--primary);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: var(--radius-xl);
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
}

.user-menu {
  position: relative;
}

.user-btn {
  color: var(--text-primary);
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  transition: background-color 0.2s ease;
}

.user-btn:hover {
  background: var(--bg-secondary);
  color: var(--primary);
}

.user-btn i.fa-user-circle {
  font-size: 1.5rem;
}

.user-name {
  font-weight: 500;
}

.dropdown-menu {
  margin-top: 0.5rem;
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  border-radius: var(--radius-md);
  min-width: 200px;
}

.dropdown-item {
  padding: 0.625rem 1rem;
  transition: background-color 0.2s ease;
  color: var(--text-primary);
}

.dropdown-item:hover {
  background: var(--bg-secondary);
  color: var(--primary);
}

.dropdown-item.text-danger:hover {
  background: rgba(241, 65, 108, 0.1);
  color: var(--bs-danger);
}

.dropdown-divider {
  border-color: var(--border-color);
}
</style>
