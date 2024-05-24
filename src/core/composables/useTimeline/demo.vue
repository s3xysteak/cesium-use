<script setup lang="ts">
import * as Cesium from 'cesium'
import { computed } from 'vue'
import { useTimeline } from '.'
import { useViewer } from '~/index'

const viewer = useViewer()

const { paused, currentTime, play, pause, rate, startTime, stopTime } = useTimeline()
const val = computed<string>({
  get: () => String(currentTime.value),
  set: (val: string) => {
    currentTime.value = Number(val)
  },
})

function addValueByTime(time: Cesium.JulianDate) {
  return 0.001 * Cesium.JulianDate.secondsDifference(time, Cesium.JulianDate.fromDate(new Date(startTime.value)))
}
viewer.entities.add({
  polyline: {
    positions: new Cesium.CallbackProperty((time) => {
      return [
        Cesium.Cartesian3.fromDegrees(-120, 35, 0),
        Cesium.Cartesian3.fromDegrees(-120 + addValueByTime(time), 35, 0),
      ]
    }, false) as any,
    width: 2,
    material: Cesium.Color.RED,
    clampToGround: true,
    classificationType: Cesium.ClassificationType.TERRAIN,
  },
})
const entity = viewer.entities.add({
  position: new Cesium.CallbackProperty((time) => {
    return Cesium.Cartesian3.fromDegrees(
      -120 + addValueByTime(time),
      35,
      0,
    )
  }, false) as any,
  point: {
    pixelSize: 20,
    color: Cesium.Color.RED,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
  },
  label: {
    text: new Cesium.CallbackProperty(time => `${(-120 + addValueByTime(time)).toFixed(6)}, 35`, false),
    font: '16px sans-serif',
    pixelOffset: new Cesium.Cartesian2(0, -20),
    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
})

viewer.trackedEntity = entity
</script>

<template>
  <div>
    <div flex="~ items-center gap-x-4">
      <p panel>
        Current Time: {{ new Date(currentTime).toLocaleString() }}
      </p>
      <p panel>
        Start Time: {{ new Date(startTime).toLocaleString() }}
      </p>
      <p panel>
        Stop Time: {{ new Date(stopTime).toLocaleString() }}
      </p>
    </div>

    <div flex="~ items-center gap-x-4">
      Time Controller
      <input
        v-model="val"
        grow
        type="range"
        :min="Cesium.JulianDate.toDate(viewer.clock.startTime).getTime()"
        :max="Cesium.JulianDate.toDate(viewer.clock.stopTime).getTime()"
      >
    </div>

    <div mt-2 flex="~ items-center gap-x-4">
      Rate: <input v-model="rate" input type="number">
      <button btn @click="play">
        play
      </button>
      <button btn @click="pause">
        pause
      </button>
      isPaused: {{ paused }}
    </div>
  </div>
</template>
