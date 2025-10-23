// @ts-ignore
<script lang="ts">
import { Component, Prop } from 'vue-facing-decorator'
import { Vue } from 'vue-facing-decorator'

@Component({
  name: 'MethodLabelCell'
})
export default class MethodLabelCell extends Vue {
  @Prop({ required: true })
  method!: any

  @Prop({ default: false })
  showCode!: boolean
}
</script>

<template>
  <div>
    <div>
      <strong>{{ method.id }} - {{ method.label }}</strong>
      <template v-if="showCode && method.code">
        ▪ <span class="fw-bold">{{ method.code }}</span>
      </template>
    </div>
    <div class="text-muted small">{{ method.description }}</div>
  </div>
</template>
