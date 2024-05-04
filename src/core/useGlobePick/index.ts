import type { Cartesian2 } from 'cesium'

export function useGlobePick(position: Cartesian2) {
  const viewer = getViewer()

  const ray = viewer.camera.getPickRay(position)

  return viewer.scene.globe.pick(ray!, viewer.scene)
}