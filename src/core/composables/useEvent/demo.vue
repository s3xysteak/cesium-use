<script setup lang="ts">
import { ref } from 'vue'
import * as Cesium from 'cesium'
import { useEvent } from '@/index'
import { getViewer } from '~composables/viewerStore'

const viewer = getViewer()
function addPoint(e: { position: any }) {
  viewer.entities.add({
    position: viewer.scene.pickPosition(e.position),
    point: {
      pixelSize: 20,
      outlineWidth: 5,
      color: Cesium.Color.fromRandom({ alpha: 1 }),
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  })
}
useEvent((e) => {
  addPoint(e)
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

// How to use `useEvent` without vue instance

function delay(time: number) {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}

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
  <div panel>
    <button btn @click="onClick">
      {{ clickText }}
    </button>

    <div b-t="1 solid light" pt-2 mt-2 text-sm>
      tips:
      <p>Right click to add point</p>
    </div>
  </div>
</template>
