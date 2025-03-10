<script setup lang="ts">
import * as Cesium from 'cesium'
import { reactive, watchEffect } from 'vue'
import { defineColor, toCartesian3, toCoordinates, useViewer } from '~/index'
import { useWaterPlane } from '.'
import glb from './golden_eagle.glb?url'
import WaterImage from './waterNormals.jpg'

const viewer = useViewer()

const entityList = Array.from({ length: 5 }, (_, k) => 100 + 20 * (k + 1) - 60).map(v => viewer.entities.add({
  position: toCartesian3(119.95 + v / 20000, 31.8, v),
  model: {
    uri: glb,
    scale: 100,
  },
}))
viewer.flyTo(entityList[2])

const positions = [
  [
    119.78,
    31.98,
  ],
  [
    119.78,
    31.62,
  ],
  [
    120.15,
    31.62,
  ],
  [
    120.15,
    31.98,
  ],
  [
    119.78,
    31.98,
  ],
]

const waterPlane = useWaterPlane()

const primitive = waterPlane({
  normalMapUrl: WaterImage,
  positions: positions.map(item => Cesium.Cartographic.fromDegrees(item[0], item[1])),
  height: -1000,
})

const form = reactive({
  height: 100,
  reflectivity: 0.15,
  rippleSize: 1000,
  waterColor: '#020E12',
  waterAlpha: 0.9,
  distortionScale: 50,
})
watchEffect(() => {
  primitive.height = form.height
  primitive.reflectivity = form.reflectivity
  primitive.rippleSize = form.rippleSize
  primitive.waterColor = defineColor(form.waterColor)
  primitive.waterAlpha = form.waterAlpha
  primitive.distortionScale = form.distortionScale
})

function toggleShow() {
  primitive.show = !primitive.show
}

const middleEntityPosition = toCoordinates(entityList[2].position!.getValue(viewer.clock.currentTime)!)
viewer.entities.add({
  position: new Cesium.CallbackPositionProperty(
    () => toCartesian3(
      middleEntityPosition.longitude,
      middleEntityPosition.latitude,
      form.height,
    ),
    false,
  ),
  point: {
    pixelSize: 4,
    color: defineColor('#f00'),
    disableDepthTestDistance: Infinity,
  },
})
</script>

<template>
  <div panel mt-2 flex="~ col gap-y-2">
    <label>
      height:
      <input v-model="form.height" input type="number">
    </label>
    <label>
      reflectivity:
      <input v-model="form.reflectivity" input step="0.05" max="1" min="0" type="number">
    </label>
    <label>
      rippleSize:
      <input v-model="form.rippleSize" input type="number">
    </label>
    <label>
      waterColor:
      <input v-model="form.waterColor" input type="color">
    </label>
    <label>
      waterAlpha:
      <input v-model="form.waterAlpha" input step="0.05" max="1" min="0" type="number">
    </label>
    <label>
      distortionScale:
      <input v-model="form.distortionScale" input type="number">
    </label>
    <div>
      show:
      <button btn @click="toggleShow">
        Toggle show
      </button>
    </div>
    <div>
      destroy:
      <button btn @click="primitive.destroy">
        destroy
      </button>
    </div>
  </div>
</template>
