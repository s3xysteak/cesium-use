<script setup lang="ts">
import * as Cesium from 'cesium'
import { onMounted, ref } from 'vue'
import { setViewer } from '../../core/composables/viewerStore'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const isMounted = ref(false)
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

  setViewer(viewer)

  isMounted.value = true
})
</script>

<template>
  <div overflow-hidden relative>
    <div ref="container" rounded h-full w-full />

    <slot v-if="isMounted" />
  </div>
</template>
