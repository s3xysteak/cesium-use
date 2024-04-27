<script setup lang="ts">
import { shallowRef } from 'vue'
import * as Cesium from 'cesium'
import img from './img.png'
import { useEvent, usePoints } from '@/index'

const data = shallowRef([
  { id: 1, lon: '86', lat: '27' },
  { id: 2, lon: '86.5', lat: 27.5 },
  { id: 3, lon: 87, lat: 28 },
  { id: 4, lon: '86', lat: '27', height: '500' },
])
function random() {
  data.value = Array.from({ length: Math.floor(Math.random() * 10) }).map(
    (_, index) => ({
      id: index,
      lon: Math.floor(Math.random() * 180),
      lat: Math.floor(Math.random() * 180),
    }),
  )
}

const { flyTo, toggleShow } = usePoints(data, item => ({
  id: item.id,
  longitude: item.lon,
  latitude: item.lat,
  height: item.height,
  billboardOptions: {
    scale: 0.2,
    image: img,
  },
  labelOptions: { text: String(item.id) },
}))

useEvent((e) => {
  const viewer = getViewer()
  viewer.scene.pick(e.position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <div absolute top-0 left-0 flex="~ col">
    <button bg-light @click="random">
      random
    </button>
    <button bg-light @click="toggleShow()">
      show
    </button>

    <button v-for="i in data" :key="i.id" bg-light @click="flyTo(i.id)">
      {{ i.id }}
    </button>
  </div>
</template>
