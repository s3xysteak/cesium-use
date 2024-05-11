<script setup lang="ts">
import geoHello from './hello.json'
import { loadGeojson } from '@/index'
import { getViewer } from '~composables/viewerStore'

const viewer = getViewer()

loadGeojson({
  url: geoHello,
  dataSourceOptions: { clampToGround: true },
  onEntity(_entity) {
    // console.log(_entity)
  },
}).then((dataSource) => {
  viewer.dataSources.add(dataSource)
})
</script>

<template>
  <div />
</template>
