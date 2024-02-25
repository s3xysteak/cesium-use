<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const isMounted = useMounted()

const container = ref<HTMLDivElement>()
onMounted(() => {
  const viewer = new Cesium.Viewer(container.value as HTMLDivElement, {
    terrain: Cesium.Terrain.fromWorldTerrain()
  })

  viewer.scene.globe.depthTestAgainstTerrain = true

  setViewer(viewer)
})
</script>

<template>
  <div h-full w-full ref="container"></div>

  <RouterView v-if="isMounted" />
</template>
