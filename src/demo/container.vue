<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// @ts-expect-error - not in includes
import { setViewer } from '~composables/viewerStore'

const isMounted = useMounted()

const container = ref<HTMLDivElement>()
onMounted(() => {
  const viewer = new Cesium.Viewer(container.value as HTMLDivElement, {
    geocoder: false,
    homeButton: false,
    selectionIndicator: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    vrButton: false,
    infoBox: false,
    terrain: Cesium.Terrain.fromWorldTerrain(),
  })

  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
  )
  viewer.cesiumWidget.creditContainer.innerHTML = ''
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.scene.screenSpaceCameraController.enableCollisionDetection = true
  viewer.scene.light = new Cesium.DirectionalLight({
    direction: new Cesium.Cartesian3(0.35, -0.918, -0.283358),
  })

  setViewer(viewer)
})
</script>

<template>
  <div ref="container" h-full w-full />

  <RouterView v-if="isMounted" />
</template>
