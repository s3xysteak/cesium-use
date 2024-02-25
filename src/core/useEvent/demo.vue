<script setup lang="ts">
import { ref } from 'vue'
import * as Cesium from 'cesium'
import { useEvent } from '@/index'

const viewer = getViewer()
const addPoint = (e: { position: any }) => {
  viewer.entities.add({
    position: viewer.scene.pickPosition(e.position),
    point: {
      pixelSize: 30,
      outlineWidth: 10,
      color: Cesium.Color.fromRandom({ alpha: 1 })
    }
  })
}
useEvent(e => {
  addPoint(e)
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

// How to use `useEvent` without vue instance

const delay = (time: number) =>
  new Promise(res => {
    setTimeout(res, time)
  })

const clickText = ref('left click do not work now')
async function onClick() {
  clickText.value = 'left click works now!'

  const handler = useEvent(addPoint, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  await delay(5000)
  handler.destroy()

  clickText.value = 'left click do not work now!'
}
</script>

<template>
  <button absolute top-10 left-10 @click="onClick">{{ clickText }}</button>
</template>
