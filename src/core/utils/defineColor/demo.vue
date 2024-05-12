<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as Cesium from 'cesium'
import { defineColor, editEntity } from '~/index'
import { useViewer } from '~composables/useViewer'

const viewer = useViewer()

const input = ref('#00ffff/50')
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
watchEffect(() => {
  editEntity(entity, {
    polygon: {
      material: defineColor(input.value),
    },
  })
})
</script>

<template>
  <input v-model="input" placeholder="rgb(0 255 255)" input absolute top-4 left-4>
</template>
