<script setup lang="ts">
import * as Cesium from 'cesium'
import { useEntityCollection } from '~/index'

const collectionCreator = useEntityCollection()
const collection = collectionCreator()
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
</script>

<template>
  <div />
</template>
