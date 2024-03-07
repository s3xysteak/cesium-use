<script setup lang="ts">
import * as Cesium from 'cesium'
import geoHello from './hello.json'
import { loadGeojson } from '@/index'

const viewer = getViewer()

loadGeojson({
  url: geoHello,
  dataSourceOptions: { clampToGround: true },
  onEntity: entity => {
    console.log(entity.properties?.getValue(Cesium.JulianDate.now()))
  }
}).then(dataSource => {
  viewer.dataSources.add(dataSource)
})
</script>

<template>
  <div></div>
</template>
