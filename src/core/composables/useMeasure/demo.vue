<script setup>
import * as Cesium from 'cesium'
import { useViewer } from '~/index'
import { useMeasure } from '.'

const { state: area, clearAll: areaClear, stop: stopArea } = useMeasure('area')
const { state: distance, clearAll: distanceClear, stop: stopDistance } = useMeasure('distance')
const { state: height, clearAll: heightClear, stop: stopHeight } = useMeasure('height')

function clearAll() {
  areaClear()
  distanceClear()
  heightClear()
}

const viewer = useViewer()
async function run() {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2464651)
  viewer.scene.primitives.add(tileset)

  viewer.flyTo(tileset)
}
run()
</script>

<template>
  <div panel flex="~ col gap-2">
    <div grid="~ cols-2 gap-x-4">
      <button btn @click="area = !area">
        area Now: {{ area }}
      </button>
      <button btn @click="stopArea()">
        stop area
      </button>
    </div>

    <div grid="~ cols-2 gap-x-4">
      <button btn @click="distance = !distance">
        distance Now: {{ distance }}
      </button>
      <button btn @click="stopDistance()">
        stop distance
      </button>
    </div>

    <div grid="~ cols-2 gap-x-4">
      <button btn @click="height = !height">
        height Now: {{ height }}
      </button>
      <button btn @click="stopHeight()">
        stop height
      </button>
    </div>

    <button btn @click="clearAll">
      clear all
    </button>
  </div>
</template>
