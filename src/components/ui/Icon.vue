// @ts-ignore
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({ name: 'Icon' })
export default class IconComponent extends Vue {
  @Prop({ required: true })
  name!: string

  @Prop({ default: 'md' })
  size!: 'sm' | 'md' | 'lg' | 'xl' | '2x' | '3x'

  @Prop({ default: 'currentColor' })
  color!: string

  @Prop({ default: '' })
  customClass!: string

  get sizeClass(): string {
    const sizeMap: Record<string, string> = {
      sm: 'svg-icon-1',
      md: 'svg-icon-2',
      lg: 'svg-icon-2x',
      xl: 'svg-icon-3x',
      '2x': 'svg-icon-2x',
      '3x': 'svg-icon-3x'
    }
    return sizeMap[this.size] || 'svg-icon-2'
  }

  get customStyle(): Record<string, string> {
    return { color: this.color }
  }
}
</script>

<template>
  <i v-if="name" :class="[name, customClass, sizeClass]" :style="customStyle"></i>
</template>

<style scoped>
/* Tailles pour l'icône directement sur <i> */
.svg-icon-1 {
  font-size: 1rem;
  line-height: 1;
  display: inline-block;
  width: 1rem;
  text-align: center;
  flex-shrink: 0;
}

.svg-icon-2 {
  font-size: 1.25rem;
  line-height: 1;
  display: inline-block;
  width: 1.25rem;
  text-align: center;
  flex-shrink: 0;
}

.svg-icon-2x {
  font-size: 1.5rem;
  line-height: 1;
  display: inline-block;
  width: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

.svg-icon-3x {
  font-size: 2rem;
  line-height: 1;
  display: inline-block;
  width: 2rem;
  text-align: center;
  flex-shrink: 0;
}
</style>
