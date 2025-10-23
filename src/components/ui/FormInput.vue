// @ts-ignore
<script lang="ts">
import { Component, Prop, Model } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'FormInput'
})
export default class FormInput extends Vue {
  @Model('modelValue', { type: [String, Number, Boolean] })
  readonly value!: string | number | boolean

  @Prop({ default: '' })
  label!: string

  @Prop({ default: 'text' })
  type!: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'textarea' | 'select'

  @Prop({ default: '' })
  placeholder!: string

  @Prop({ default: false })
  required!: boolean

  @Prop({ default: false })
  disabled!: boolean

  @Prop({ default: false })
  readonly!: boolean

  @Prop({ default: '' })
  error!: string

  @Prop({ default: '' })
  hint!: string

  @Prop({ default: 'md' })
  size!: 'sm' | 'md' | 'lg'

  @Prop({ default: '' })
  icon!: string

  @Prop({ default: '' })
  id!: string

  @Prop({ default: '' })
  name!: string

  @Prop({ default: undefined })
  min!: number | string

  @Prop({ default: undefined })
  max!: number | string

  @Prop({ default: undefined })
  step!: number | string

  @Prop({ default: 3 })
  rows!: number

  @Prop({ default: () => [] })
  options!: Array<{ value: string | number; label: string; disabled?: boolean }>

  @Prop({ default: false })
  multiple!: boolean

  // Computed
  get inputId(): string {
    return this.id || `input-${this._uid}`
  }

  get inputClasses(): string[] {
    const classes = ['form-control']

    if (this.size === 'sm') classes.push('form-control-sm')
    if (this.size === 'lg') classes.push('form-control-lg')
    if (this.error) classes.push('is-invalid')

    return classes
  }

  get wrapperClasses(): object {
    return {
      'form-input-wrapper': true,
      'form-input-wrapper--with-icon': !!this.icon,
      'form-input-wrapper--error': !!this.error
    }
  }

  // Methods
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    let newValue: string | number | boolean = target.value

    // Convert to number if type is number
    if (this.type === 'number' && newValue !== '') {
      newValue = parseFloat(newValue as string)
    }

    this.$emit('update:modelValue', newValue)
    this.$emit('input', newValue)
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    this.$emit('change', target.value)
  }

  handleBlur(event: FocusEvent): void {
    this.$emit('blur', event)
  }

  handleFocus(event: FocusEvent): void {
    this.$emit('focus', event)
  }
}
</script>

<template>
  <div class="form-group" :class="wrapperClasses">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="form-label"
      :class="{ 'required': required }"
    >
      {{ label }}
      <span v-if="required" class="text-danger ms-1">*</span>
    </label>

    <!-- Input wrapper (for icon support) -->
    <div class="input-wrapper" :class="{ 'input-group': icon }">
      <!-- Icon -->
      <span v-if="icon" class="input-group-text">
        <i :class="icon"></i>
      </span>

      <!-- Text Input -->
      <input
        v-if="type !== 'textarea' && type !== 'select'"
        :id="inputId"
        :type="type"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :min="min"
        :max="max"
        :step="step"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <!-- Textarea -->
      <textarea
        v-else-if="type === 'textarea'"
        :id="inputId"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      ></textarea>

      <!-- Select -->
      <select
        v-else-if="type === 'select'"
        :id="inputId"
        :name="name"
        :value="value"
        :required="required"
        :disabled="disabled"
        :multiple="multiple"
        :class="inputClasses"
        @input="handleInput"
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <!-- Hint text -->
    <small v-if="hint && !error" class="form-text text-muted">
      {{ hint }}
    </small>

    <!-- Error message -->
    <div v-if="error" class="invalid-feedback d-block">
      {{ error }}
    </div>
  </div>
</template>

<style scoped>
/* ============================================
   FORM INPUT - Theme variables overlay
   ============================================ */

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
  transition: color var(--transition-theme);
}

.form-label.required {
  font-weight: 600;
}

.form-control {
  background-color: var(--surface);
  border-color: var(--border-color);
  color: var(--text-primary);
  transition: all var(--transition-theme);
}

.form-control:focus {
  background-color: var(--surface);
  border-color: var(--primary);
  color: var(--text-primary);
  box-shadow: 0 0 0 0.2rem rgba(var(--primary-rgb), 0.25);
}

.form-control:disabled,
.form-control[readonly] {
  background-color: var(--bg-secondary);
  opacity: 0.6;
}

.input-group-text {
  background-color: var(--surface);
  border-color: var(--border-color);
  color: var(--text-secondary);
  transition: all var(--transition-theme);
}

.form-input-wrapper--with-icon .form-control {
  border-left: none;
}

.form-input-wrapper--error .form-control {
  border-color: var(--danger);
}

.form-text {
  margin-top: 0.25rem;
  font-size: 0.875rem;
}

.invalid-feedback {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Select custom arrow */
select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  padding-right: 2.5rem;
}

/* Responsive */
@media (max-width: 576px) {
  .form-group {
    margin-bottom: 0.75rem;
  }

  .form-label {
    font-size: 0.9rem;
  }
}
</style>
