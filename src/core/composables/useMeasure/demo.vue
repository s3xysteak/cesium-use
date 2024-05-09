<script setup>
import { useMeasure } from '.'

const { state: area, clearAll: areaClear } = useMeasure('area')
const { state: distance, clearAll: distanceClear } = useMeasure('distance')
const { state: height, clearAll: heightClear } = useMeasure('height')

function clearAll() {
  areaClear()
  distanceClear()
  heightClear()
}
</script>

<template>
  <div flex="~ col gap-2" absolute top-10 left-10>
    <button btn @click="area = !area">
      area Now: {{ area }}
    </button>

    <button btn @click="distance = !distance">
      distance Now: {{ distance }}
    </button>

    <button btn @click="height = !height">
      height Now: {{ height }}
    </button>

    <button btn @click="clearAll">
      clear all
    </button>
  </div>
</template>
