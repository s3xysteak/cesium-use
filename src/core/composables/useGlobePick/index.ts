import type { Cartesian2 } from 'cesium'

export function useGlobePick(viewer = getViewer()) {
  return (position: Cartesian2) => viewer.scene.globe.pick(viewer.camera.getPickRay(position)!, viewer.scene)
}
