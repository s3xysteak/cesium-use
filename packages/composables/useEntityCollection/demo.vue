<script setup lang="ts">
import { effectScope } from 'vue'
import { toCartesian3 } from '~/utils/toCartesian3'
import { useEntityCollection } from '.'
import { useViewer } from '../useViewer'

const viewer = useViewer()

const scope = effectScope()
scope.run(() => {
  const entities = useEntityCollection()
  const e = entities.add({
    position: toCartesian3(113, 22, 1000),
    point: {
      pixelSize: 200,
    },
  })
  viewer.flyTo(e)
})
</script>

<template>
  <button btn @click="scope.stop()">
    Dispose scope
  </button>
</template>
