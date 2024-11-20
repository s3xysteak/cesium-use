import type { Cartesian2 } from 'cesium'
import { useViewer } from '~composables/useViewer'

/**
 * Get the coordinates on the ellipsoid as rays
 *
 * ## example
 * ```js
 * const globePick = useGlobePick()
 *
 * const eventHandler = useEventHandler()
 * eventHandler(({ position }) => {
 *   const pos = globePick(position)
 * }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
 * ```
 */
export function useGlobePick(viewer = useViewer()) {
  return (position: Cartesian2) => viewer.scene.globe.pick(viewer.camera.getPickRay(position)!, viewer.scene)
}
