<script setup lang="ts">
import { useViewer } from '~composables/useViewer'
import * as Cesium from 'cesium'
import { ref, watchEffect } from 'vue'
import { defineColor, editEntity } from '~/index'

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
  <div panel>
    Color : <input v-model="input" placeholder="rgb(0 255 255)" input>
  </div>
</template>
