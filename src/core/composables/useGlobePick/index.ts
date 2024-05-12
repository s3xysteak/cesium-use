import type { Cartesian2 } from 'cesium'
import { useViewer } from '~composables/useViewer'

export function useGlobePick(viewer = useViewer()) {
  return (position: Cartesian2) => viewer.scene.globe.pick(viewer.camera.getPickRay(position)!, viewer.scene)
}
