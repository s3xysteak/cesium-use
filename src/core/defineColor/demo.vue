<script setup lang="ts">
import * as Cesium from 'cesium'
import { defineColor } from '@/index'
const viewer = getViewer()

viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
    material: defineColor('#f00')
  }
})
</script>

<template>
  <div></div>
</template>
