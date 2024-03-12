<script setup lang="ts">
import * as Cesium from 'cesium'
import { entityCollection } from '@/index'

const collection = entityCollection()
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
</script>

<template>
  <div />
</template>
