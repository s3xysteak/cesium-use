import * as Cesium from 'cesium'

/**
 * Get the projection position of p1 on p0
 */
export function projectionPosition(p0: Cesium.Cartesian3, p1: Cesium.Cartesian3): Cesium.Cartesian3 | undefined {
  const k = Cesium.Cartesian3.dot(p0, p1) / Cesium.Cartesian3.dot(p0, p0)
  return Cesium.Cartesian3.multiplyByScalar(p0, k, new Cesium.Cartesian3())
}
