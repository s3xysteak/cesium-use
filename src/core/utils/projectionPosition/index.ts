import * as Cesium from 'cesium'

/**
 * Get the projection position of p1 on p0
 *
 * ## example
 * ```js
 * const p0 = new Cesium.Cartesian3(1, 0, 0);
 * const p1 = new Cesium.Cartesian3(1, 1, 0);
 *
 * const projectedPosition = projectionPosition(p0, p1);
 * console.log(projectedPosition); // Output: Cartesian3 {x: 1, y: 0, z: 0}
 * ```
 */
export function projectionPosition(p0: Cesium.Cartesian3, p1: Cesium.Cartesian3) {
  const k = Cesium.Cartesian3.dot(p0, p1) / Cesium.Cartesian3.dot(p0, p0)
  return Cesium.Cartesian3.multiplyByScalar(p0, k, new Cesium.Cartesian3())
}
