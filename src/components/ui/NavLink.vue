// @ts-ignore
<script lang="ts">
import { Component, Prop } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Icon from "./Icon.vue";

@Component({
  name: "NavLink",
  components: { Icon },
})
export default class NavLink extends Vue {
  @Prop({ required: true })
  to!: string;

  @Prop({ default: undefined })
  icon?: string;

  @Prop({ required: true })
  label!: string;

  @Prop({ default: false })
  isActive!: boolean;

  @Prop({ default: false })
  isSubmenu!: boolean;
}
</script>

<template>
  <router-link
    :to="to"
    class="nav-link"
    :class="{
      'nav-link--active': isActive,
      'nav-link--submenu': isSubmenu,
    }"
  >
    <Icon
      v-if="icon"
      :name="icon"
      :size="isSubmenu ? 'sm' : 'md'"
      class="nav-link__icon"
    />
    <span class="nav-link__label">{{ label }}</span>
  </router-link>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  border-radius: var(--radius-md);
  margin: 0.25rem 0;
  font-weight: 500;
}

.nav-link:hover {
  background: var(--bg-secondary);
  color: var(--primary);
  transform: translatey(2px);
}

.nav-link--active {
  background: linear-gradient(
    90deg,
    rgba(var(--primary-rgb), 0.1),
    rgba(var(--primary-rgb), 0.05)
  );
  color: var(--primary);
  border-left: 3px solid var(--primary);
  padding-left: calc(1rem - 3px);
}

.nav-link--submenu {
  padding-left: 2.5rem !important;
  font-size: 0.9rem;
  margin: 0.15rem 0.25rem;
  color: var(--text-muted);
}

.nav-link--submenu:hover {
  background: var(--surface-hover);
  color: var(--primary);
}

.nav-link--submenu.nav-link--active {
  background: rgba(var(--primary-rgb), 0.08);
  color: var(--primary);
  border-left: 2px solid var(--primary);
  padding-left: calc(2.5rem - 2px) !important;
}

.nav-link__icon {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.nav-link--submenu .nav-link__icon {
  font-size: 0.95rem;
  width: 18px;
  opacity: 0.8;
}

.nav-link__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
