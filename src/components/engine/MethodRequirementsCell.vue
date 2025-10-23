// @ts-ignore
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'MethodRequirementsCell'
})
export default class MethodRequirementsCell extends Vue {
  @Prop({ required: true })
  requirements!: string[]
}
</script>

<template>
  <div class="d-flex flex-wrap gap-1">
    <span
      v-for="req in requirements"
      :key="req"
      class="badge bg-light-danger"
    >
      {{ req }}
    </span>
  </div>
</template>
