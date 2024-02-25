import { ref } from 'vue'
import { useThrottleFn } from '@vueuse/core'
import * as Cesium from 'cesium'
import { useEvent } from '@/index'

export interface UsePointerPositionOptions {
  throttle?: Parameters<typeof useThrottleFn>[1]
}

export function usePointerPosition(options: UsePointerPositionOptions = {}) {
  const { throttle } = options

  const viewer = getViewer()

  const lon = ref('')
  const lat = ref('')
  const alt = ref('')

  useEvent(
    useThrottleFn((e: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
      const position = viewer.scene.pickPosition(e.endPosition)

      if (position === undefined) {
        lon.value = ''
        lat.value = ''
        alt.value = ''
        return
      }

      const cartographic = Cesium.Cartographic.fromCartesian(position)
      const { longitude, latitude, height } = cartographic

      lon.value = Cesium.Math.toDegrees(longitude).toFixed(5)
      lat.value = Cesium.Math.toDegrees(latitude).toFixed(5)
      alt.value = height.toFixed(2)
    }, throttle),
    Cesium.ScreenSpaceEventType.MOUSE_MOVE
  )

  return {
    lon,
    lat,
    alt
  }
}
