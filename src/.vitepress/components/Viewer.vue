<script setup lang="ts">
import * as Cesium from 'cesium'
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { useViewerProvider } from '../../core/composables/useViewer'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// @ts-expect-error - vite env
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_ION_TOKEN

const container = ref<HTMLDivElement>()
const { isMounted } = useViewerProvider(() => {
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

    /** Support high resolution screen */
    useBrowserRecommendedResolution: false,
    msaaSamples: 4,
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

  return viewer
})

const box = ref<HTMLDivElement>()
const { toggle, isFullscreen } = useFullscreen(box)
</script>

<template>
  <div ref="box" relative :class=" isFullscreen && 'overflow-y-auto bg-light dark:bg-dark'">
    <button v-show="!isFullscreen" mb-2 btn @click="toggle">
      Fullscreen
    </button>

    <div ref="container" rounded h-full w-full />

    <slot v-if="isMounted" />
  </div>
</template>
