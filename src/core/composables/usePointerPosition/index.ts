import { makeDestructurable, useThrottleFn } from '@vueuse/core'
import { useViewer } from '~composables/useViewer'
import * as Cesium from 'cesium'
import { ref } from 'vue'
import { useEventHandler } from '~/index'

export interface UsePointerPositionOptions {
  throttle?: Parameters<typeof useThrottleFn>[1]
  longitudeToFixed?: number
  latitudeToFixed?: number
  heightToFixed?: number
}

/**
 * Obtain the current mouse's latitude, longitude, and altitude reactively.
 *
 * Implement optional throttling based on `vueuse`'s `useThrottleFn`.
 *
 * ## example
 * ```js
 *
 * // const { longitude, latitude, altitude } = usePointerPosition()
 *
 * // If you prefer the array destructuring syntax.
 * const [lon, lat, alt] = usePointerPosition({
 *   throttle: 150 // Throttling for 150ms.
 * })
 * ```
 */
export function usePointerPosition(options: UsePointerPositionOptions = {}) {
  const {
    throttle,
    longitudeToFixed = 6,
    latitudeToFixed = 6,
    heightToFixed = 2,
  } = options

  const viewer = useViewer()

  const lon = ref('')
  const lat = ref('')
  const alt = ref('')

  const eventHandler = useEventHandler()
  eventHandler(
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

      lon.value = Cesium.Math.toDegrees(longitude).toFixed(longitudeToFixed)
      lat.value = Cesium.Math.toDegrees(latitude).toFixed(latitudeToFixed)
      alt.value = height.toFixed(heightToFixed)
    }, throttle),
    Cesium.ScreenSpaceEventType.MOUSE_MOVE,
  )

  return makeDestructurable(
    {
      longitude: lon,
      latitude: lat,
      altitude: alt,
    },
    [
      lon,
      lat,
      alt,
    ],
  )
}
