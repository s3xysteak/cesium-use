import type { Cartesian2, Entity, Viewer } from 'cesium'

export function pickPosition(pos: Cartesian2, viewer: Viewer) {
  return viewer.scene.pickPosition(pos) ?? (viewer.scene.pick(pos)?.id as Entity)?.position?.getValue(viewer.clock.currentTime)
}
