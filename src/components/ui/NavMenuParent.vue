// @ts-ignore
<script lang="ts">
import { Component, Prop, Emit } from "vue-facing-decorator";
import { Vue } from "vue-facing-decorator";
import Icon from "./Icon.vue";

@Component({
  name: "NavMenuParent",
  components: { Icon },
})
export default class NavMenuParent extends Vue {
  @Prop({ required: true })
  name!: string;

  @Prop({ default: undefined })
  icon?: string;

  @Prop({ required: true })
  label!: string;

  @Prop({ default: false })
  isExpanded!: boolean;

  @Prop({ default: false })
  isCollapsed!: boolean;

  @Emit("toggle")
  emitToggle() {
    return;
  }
}
</script>

<template>
  <div class="nav-menu-parent">
    <button
      class="nav-menu-parent__button"
      :class="{ 'nav-menu-parent__button--expanded': isExpanded }"
      @click="emitToggle"
    >
      <Icon v-if="icon" :name="icon" size="md" class="nav-menu-parent__icon-wrapper" />
      <span v-if="!isCollapsed" class="nav-menu-parent__label">{{
        label
      }}</span>
      <i
        v-if="!isCollapsed"
        class="fas fa-chevron-down nav-menu-parent__arrow"
        :class="{ 'nav-menu-parent__arrow--rotated': isExpanded }"
      ></i>
    </button>

    <div
      v-if="!isCollapsed"
      class="nav-menu-parent__submenu"
      :class="{ 'nav-menu-parent__submenu--expanded': isExpanded }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.nav-menu-parent {
  position: relative;
  margin: 0.25rem 0;
}

.nav-menu-parent__button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  border-radius: var(--radius-md);
  margin: 0.25rem 0;
  font-weight: 500;
  width: 100%;
  text-align: left;
  padding-right: 2.5rem;
}

.nav-menu-parent__button:hover {
  background: var(--bg-secondary);
  color: var(--primary);
}

.nav-menu-parent__button--expanded {
  background: var(--bg-secondary);
  color: var(--primary);
}

.nav-menu-parent__icon-wrapper {
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
  flex-shrink: 0;
  display: inline-block;
  line-height: 1;
}

.nav-menu-parent__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.nav-menu-parent__arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  transition: transform 0.3s ease;
  font-size: 0.75rem;
  opacity: 0.6;
}

.nav-menu-parent__arrow--rotated {
  transform: translateY(-50%) rotate(180deg);
}

.nav-menu-parent__submenu {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  margin: 0.25rem 0.5rem;
}

.nav-menu-parent__submenu--expanded {
  max-height: 1000px;
  padding: 0.25rem 0;
}
</style>
