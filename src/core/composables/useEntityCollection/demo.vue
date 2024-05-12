<script setup lang="ts">
import * as Cesium from 'cesium'
import { useEntityCollection } from '~/index'

const collection = useEntityCollection()
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
</script>

<template>
  <div />
</template>
