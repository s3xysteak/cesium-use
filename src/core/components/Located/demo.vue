<script setup lang="ts">
import * as Cesium from 'cesium'
import { computed, defineComponent, h, ref } from 'vue'
import { toCartesian3, useEventHandler, useViewer } from '~/index'
import Located from './index.vue'

const viewer = useViewer()

const state = ref(true)
const lon = ref<number>(-100)
const lat = ref<number>(40)

const isManual = ref(false)
const onPostRender = useEventHandler(viewer.scene.postRender)
onPostRender(() => {
  if (isManual.value)
    return

  lon.value += 0.01
})

const coordinate = computed(() => [lon.value, lat.value, 1000])

const MyButton = defineComponent((_, { slots }) => {
  return () => h('button', { class: 'btn' }, slots.default?.())
})

viewer.entities.add({
  position: new Cesium.CallbackProperty(() => toCartesian3(coordinate.value), false) as any,
  point: {
    pixelSize: 10,
    color: Cesium.Color.RED,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
})

const left = ref(0)
const top = ref(0)
</script>

<template>
  <div panel>
    <div mb-4 flex="~ gap-x-4">
      <label>
        longitude:
        <input v-model="lon" type="number" input placeholder="lon">
      </label>
      <label>
        latitude:
        <input v-model="lat" type="number" input placeholder="lat">
      </label>
    </div>

    <button btn @click="isManual = !isManual">
      Now {{ isManual ? 'Manual' : 'Auto' }}
    </button>

    <button ml-4 btn @click="state = !state">
      Now {{ state ? 'Show' : 'Hide' }}
    </button>

    <label>
      left :
      <input v-model="left" input w-34 type="number">
    </label>

    <label>
      top :
      <input v-model="top" input w-34 type="number">
    </label>
  </div>

  <Located
    v-model="state"
    :as="MyButton"
    placement="top"
    :coordinate="coordinate"
    :offset="{ left, top }"
  >
    <div>
      Hello world!
    </div>
  </Located>
</template>
