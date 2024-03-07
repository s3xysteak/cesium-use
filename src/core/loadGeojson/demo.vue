<script setup lang="ts">
import geoHello from './hello.json'
import { loadGeojson } from '@/index'

const viewer = getViewer()

loadGeojson({
  url: geoHello,
  dataSourceOptions: { clampToGround: true },
  onEntity(entity) {
    console.log(entity)
  }
}).then(dataSource => {
  viewer.dataSources.add(dataSource)
})
</script>

<template>
  <div></div>
</template>
