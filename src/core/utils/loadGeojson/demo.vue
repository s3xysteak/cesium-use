<script setup lang="ts">
import * as Cesium from 'cesium'
import geoHello from './hello.json'
import { loadGeojson, useEvent } from '~/index'
import { useViewer } from '~composables/useViewer'

const viewer = useViewer()

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

const eventCreator = useEvent()
eventCreator((e) => {
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
