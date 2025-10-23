// @ts-ignore
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'
import iconsData from '@/assets/icons.json'

@Component({ name: 'IconSelector' })
export default class IconSelectorComponent extends Vue {
  @Prop({ default: '' })
  modelValue!: string

  isOpen = false
  search = ''
  icons: string[] = []

  get filteredIcons(): string[] {
    if (!this.search.trim()) {
      return this.icons.slice(0, 100)
    }
    return this.icons
      .filter((icon) => icon.toLowerCase().includes(this.search.toLowerCase()))
      .slice(0, 100)
  }

  mounted(): void {
    this.icons = (iconsData as string[]) || []
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen
  }

  closeDropdown(): void {
    this.isOpen = false
    this.search = ''
  }

  selectIcon(icon: string): void {
    this.$emit('update:modelValue', icon)
    this.closeDropdown()
  }
}
</script>

<template>
  <div class="icon-selector">
    <div class="icon-selector__current">
      <b-button
        v-if="modelValue"
        :title="modelValue"
        class="icon-selector__button"
        size="sm"
        variant="primary"
        @click="toggleDropdown"
      >
        <i :class="modelValue" class="me-2"></i>
        {{ modelValue }}
      </b-button>
      <b-button v-else class="icon-selector__button" size="sm" variant="outline-primary" @click="toggleDropdown">
        <i class="fad fa-search me-2"></i>
        Sélectionner une icône
      </b-button>
    </div>

    <div v-if="isOpen" class="icon-selector__dropdown">
      <div class="icon-selector__search">
        <b-form-input
          v-model="search"
          placeholder="Rechercher une icône..."
          class="icon-selector__search-input"
          type="text"
        ></b-form-input>
      </div>

      <div class="icon-selector__list">
        <div
          v-for="icon in filteredIcons"
          :key="icon"
          :title="icon"
          class="icon-selector__item"
          @click="selectIcon(icon)"
        >
          <i :class="icon" class="fs-5"></i>
        </div>
      </div>

      <div v-if="filteredIcons.length === 0" class="icon-selector__empty">
        Aucune icône trouvée
      </div>
    </div>

    <div v-if="isOpen" class="icon-selector__backdrop" @click="closeDropdown"></div>
  </div>
</template>

<style scoped>
.icon-selector {
  position: relative;
  display: inline-block;
}

.icon-selector__current {
  display: inline-block;
}

.icon-selector__button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.icon-selector__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 300px;
  margin-top: 8px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.icon-selector__search {
  padding: 8px;
  border-bottom: 1px solid #dee2e6;
}

.icon-selector__search-input {
  font-size: 0.875rem;
}

.icon-selector__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 4px;
  padding: 8px;
  max-height: 300px;
  overflow-y: auto;
}

.icon-selector__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.icon-selector__item:hover {
  background-color: #e7f1ff;
  color: #0c63e4;
}

.icon-selector__empty {
  padding: 16px;
  text-align: center;
  color: #6c757d;
  font-size: 0.875rem;
}

.icon-selector__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}
</style>
