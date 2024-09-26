<script setup>
import * as Cesium from 'cesium'
import { ref, shallowRef } from 'vue'
import { Located, useEventHandler, useViewer } from '../..'

const viewer = useViewer()

const show = ref(true)
const pos = shallowRef()

const handler = useEventHandler()
handler(({ position }) => {
  pos.value = viewer.scene.pickPosition(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
</script>

<template>
  <Located v-model="show" :coordinate="pos" :offset="{ top: 50 }">
    <div bg-gradient-to-r shadow-lg from-rose to-blue text-nowrap c-white rounded p-4>
      I am Cesium Use!
    </div>
  </Located>
</template>
