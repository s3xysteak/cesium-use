<script setup lang="ts">
import img from '../usePoints/img.png'
import { useFlyToArea, usePoints } from '~/index'

const data = [
  { id: 1, lon: '86', lat: '27' },
  { id: 2, lon: '86.5', lat: 27.5 },
  { id: 3, lon: 87, lat: 28 },
  { id: 4, lon: '86', lat: '27', height: '500' },
]
usePoints(
  () => data,
  item => ({
    id: item.id,
    longitude: item.lon,
    latitude: item.lat,
    height: item.height,
    billboardOptions: {
      scale: 0.2,
      image: img,
    },
    labelOptions: { text: String(item.id) },
  }),
)

const flyToArea = useFlyToArea()
const fly = () => flyToArea(data.map(item => [item.lon, item.lat]))
</script>

<template>
  <div panel>
    <button btn @click="fly">
      Click me to fly!
    </button>
  </div>
</template>
