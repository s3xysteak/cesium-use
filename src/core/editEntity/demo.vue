<script setup lang="ts">
import * as Cesium from 'cesium'
import { editEntity } from './index'

const viewer = getViewer()
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})
editEntity(
  entity.polygon as Cesium.PolygonGraphics,
  {
    material: Cesium.Color.AQUA
  },
  { material: Cesium.Color.RED }
)
</script>

<template>
  <div></div>
</template>
