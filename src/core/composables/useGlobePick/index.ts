import type { Cartesian2 } from 'cesium'
import { useViewer } from '~composables/useViewer'

/**
 * Get the coordinates on the ellipsoid as rays
 */
export function useGlobePick(viewer = useViewer()) {
  return (position: Cartesian2) => viewer.scene.globe.pick(viewer.camera.getPickRay(position)!, viewer.scene)
}
