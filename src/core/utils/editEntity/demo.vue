<script setup lang="ts">
import * as Cesium from 'cesium'
import { editEntity } from '.'
import { getViewer } from '~composables/viewerStore'

const viewer = getViewer()
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
editEntity(
  entity,
  {
    polygon: {
      material: Cesium.Color.AQUA,
    },
  },
  {
    polygon: {
      material: Cesium.Color.RED,
    },
  },
)
</script>

<template>
  <div />
</template>
