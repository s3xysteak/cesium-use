<script setup lang="ts">
import * as Cesium from 'cesium'
import geoHello from './hello.json'
import { loadGeojson, useEvent } from '@/index'
import { getViewer } from '~composables/viewerStore'

const viewer = getViewer()

loadGeojson({
  url: geoHello,
  dataSourceOptions: { clampToGround: true },
  onEntity(_entity) {
    Object.defineProperties(_entity, {
      demo: {
        value: true,
      },
    })
  },
}).then((dataSource) => {
  viewer.dataSources.add(dataSource)
})

useEvent((e) => {
  const picked = viewer.scene.pick(e.position)
  if (!picked?.id?.demo)
    return

  // eslint-disable-next-line no-alert
  alert('Ya ha ha~ You clicked me!')
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <div />
</template>
