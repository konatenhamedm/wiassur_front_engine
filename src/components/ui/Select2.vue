<template>
  <div class="select2-container" ref="selectContainer">
    <div class="select2-selection" @click="toggleDropdown">
      <div class="select2-selection__rendered">
        <span v-if="selectedLabel" class="select2-selection__choice">
          {{ selectedLabel }}
        </span>
        <span v-else class="select2-selection__placeholder">
          {{ placeholder }}
        </span>
      </div>
      <span class="select2-selection__arrow">
        <svg 
          :class="['arrow-icon', { 'rotated': isOpen }]"
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="currentColor"
        >
          <path d="M4 6l4 4 4-4"/>
        </svg>
      </span>
    </div>

    <Teleport to="body">
      <Transition name="dropdown">
        <div 
          v-if="isOpen" 
          class="select2-dropdown"
          :style="dropdownStyle"
        >
          <div class="select2-search">
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              class="select2-search__field"
              :placeholder="searchPlaceholder"
              @click.stop
            />
          </div>
          
          <div class="select2-results">
            <ul class="select2-results__options">
              <li
                v-for="item in filteredItems"
                :key="item[valueKey]"
                class="select2-results__option"
                :class="{ 'selected': item[valueKey] === modelValue }"
                @click="selectItem(item)"
              >
                <span class="option-label">{{ item[labelKey] }}</span>
                <span v-if="item[valueKey] === modelValue" class="check-icon">✓</span>
              </li>
              <li v-if="filteredItems.length === 0" class="select2-results__option select2-results__option--no-results">
                {{ noResultsText }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-facing-decorator";

@Component({
  name: "Select2",
  emits: ["update:modelValue", "change"]
})
export default class Select2 extends Vue {
  @Prop({ required: true }) modelValue!: string;
  @Prop({ required: true }) items!: any[];
  @Prop({ default: "uuid" }) valueKey!: string;
  @Prop({ default: "label" }) labelKey!: string;
  @Prop({ default: "Sélectionner..." }) placeholder!: string;
  @Prop({ default: "Rechercher..." }) searchPlaceholder!: string;
  @Prop({ default: "Aucun résultat trouvé" }) noResultsText!: string;

  public isOpen = false;
  public searchQuery = "";
  public dropdownStyle: any = {};

  declare $refs: {
    selectContainer: HTMLElement;
    searchInput: HTMLInputElement;
  };

  get selectedLabel(): string {
    const selected = this.items.find(
      (item: any) => item[this.valueKey] === this.modelValue
    );
    return selected ? selected[this.labelKey] : "";
  }

  get filteredItems(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.items;

    return this.items.filter((item: any) => {
      const label = String(item[this.labelKey] || "").toLowerCase();
      const value = String(item[this.valueKey] || "").toLowerCase();
      return label.includes(query) || value.includes(query);
    });
  }

  updateDropdownPosition() {
    if (!this.$refs.selectContainer) return;
    
    const rect = this.$refs.selectContainer.getBoundingClientRect();
    this.dropdownStyle = {
      position: 'fixed',
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${rect.width}px`
    };
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.$nextTick(() => {
        this.searchQuery = "";
        this.updateDropdownPosition();
        this.$refs.searchInput?.focus();
      });
    }
  }

  selectItem(item: any) {
    this.$emit("update:modelValue", item[this.valueKey]);
    this.$emit("change", item);
    this.isOpen = false;
    this.searchQuery = "";
  }

  handleClickOutside(event: Event) {
    if (!this.$refs.selectContainer?.contains(event.target as Node)) {
      this.isOpen = false;
    }
  }

  handleScroll() {
    if (this.isOpen) {
      this.updateDropdownPosition();
    }
  }

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleScroll);
  }

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleScroll);
  }
}
</script>

<style scoped>
.select2-container {
  position: relative;
  width: 100%;
  font-size: 0.875rem;
}

.select2-selection {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  transition: all 0.2s ease;
  min-height: 42px;
}

.select2-selection:hover {
  border-color: #adb5bd;
}

.select2-selection:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select2-selection__rendered {
  flex: 1;
  overflow: hidden;
}

.select2-selection__choice {
  color: #1a1a1a;
  font-weight: 500;
}

.select2-selection__placeholder {
  color: #6c757d;
}

.select2-selection__arrow {
  display: flex;
  align-items: center;
  color: #6c757d;
  margin-left: 0.5rem;
}

.arrow-icon {
  transition: transform 0.2s ease;
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

.select2-dropdown {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  z-index: 99999;
  max-height: 300px;
  display: flex;
  flex-direction: column;
}

.select2-search {
  padding: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}

.select2-search__field {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
}

.select2-search__field:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.select2-results {
  overflow-y: auto;
  max-height: 240px;
}

.select2-results__options {
  list-style: none;
  padding: 0.5rem;
  margin: 0;
}

.select2-results__option {
  padding: 0.625rem 0.75rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select2-results__option:hover {
  background-color: #f8f9fa;
}

.select2-results__option.selected {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 500;
}

.select2-results__option--no-results {
  color: #6c757d;
  cursor: default;
  text-align: center;
  font-style: italic;
}

.select2-results__option--no-results:hover {
  background-color: transparent;
}

.option-label {
  flex: 1;
}

.check-icon {
  margin-left: 0.5rem;
  font-weight: bold;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.select2-results::-webkit-scrollbar {
  width: 6px;
}

.select2-results::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.select2-results::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.select2-results::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>