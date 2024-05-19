<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import * as Cesium from 'cesium'
import WaterImage from './waterNormals.jpg'
import { useWaterPlane } from '.'
import { useViewer } from '~/index'

const viewer = useViewer()

async function run() {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2464651)
  viewer.scene.primitives.add(tileset)

  viewer.flyTo(tileset)
}
run()

const positions = [
  [
    -76.36747995597236,
    34.96256844815245,
  ],
  [
    -76.37906600247254,
    34.93306058888281,
  ],
  [
    -76.33575625722067,
    34.93249520055339,
  ],
  [
    -76.33575625722067,
    34.96335970042942,
  ],
  [
    -76.36747995597236,
    34.96256844815245,
  ],
]

const waterPlane = useWaterPlane()

const primitive = waterPlane({
  normalMapUrl: WaterImage,
  positions: positions.map(item => Cesium.Cartographic.fromDegrees(item[0], item[1])),
  height: 10,
})

const form = reactive({
  height: 10,
  reflectivity: 0.15,
  rippleSize: 100,
  waterAlpha: 0.9,
  distortionScale: 10,
})
watchEffect(() => {
  primitive.height = form.height
  primitive.reflectivity = form.reflectivity
  primitive.rippleSize = form.rippleSize
  primitive.waterAlpha = form.waterAlpha
  primitive.distortionScale = form.distortionScale
})

function toggleShow() {
  primitive.show = !primitive.show
}
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
