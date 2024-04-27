<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMounted } from '@vueuse/core'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

const isMounted = useMounted()

const container = ref<HTMLDivElement>()
onMounted(() => {
  const viewer = new Cesium.Viewer(container.value as HTMLDivElement, {
    geocoder: false, // 是否显示地名查找控件
    homeButton: false, // 是否显示主页按钮
    selectionIndicator: false, // 是否显示选取指示器组件
    sceneModePicker: false, // 是否显示场景按钮
    baseLayerPicker: false, // 是否显示图层选择控件
    fullscreenButton: false, // 是否全屏按钮
    navigationHelpButton: false, // 是否显示导航帮助按钮
    animation: false, // 是否创建动画小器件，左下角仪表
    timeline: false, // 是否显示时间线控件
    vrButton: false, // 是否创建vr部件
    infoBox: false, // 是否显示点击要素之后显示的信息
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
