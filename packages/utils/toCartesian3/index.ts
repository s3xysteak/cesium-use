import { isUndefined } from '@s3xysteak/utils'
import { type MaybeCoordinates, normalizeCoordinates } from '~shared/coordinate'
import * as Cesium from 'cesium'

type NumberOrString = number | string

/**
 * Normalized coordinates/Cartesian3/... to `Cesium.Cartesian3`.
 *
 * ## example
 * ```js
 * toCartesian3(120, 80)
 * toCartesian3({ longitude: 120, latitude: 80 }) // Cesium.Cartesian3.fromDegrees(120, 80)
 * toCartesian3(120, 80, 1000) // Cesium.Cartesian3.fromDegrees(120, 80)
 * toCartesian3([120, 80, 1000]) // Cesium.Cartesian3.fromDegrees(120, 80, 1000)
 * toCartesian3(new Cesium.Cartesian3(100, 200, 300)) // new Cesium.Cartesian3(100, 200, 300)
 * ```
 */
export function toCartesian3(longitude: NumberOrString, latitude: NumberOrString, altitude?: NumberOrString): Cesium.Cartesian3
export function toCartesian3(source: Cesium.Cartesian3 | MaybeCoordinates): Cesium.Cartesian3
export function toCartesian3(
  arg1: Cesium.Cartesian3 | MaybeCoordinates | NumberOrString,
  arg2?: NumberOrString,
  arg3?: NumberOrString,
): Cesium.Cartesian3 {
  if (arg1 instanceof Cesium.Cartesian3)
    return arg1

  const source = isUndefined(arg2) ? arg1 : [arg1, arg2, arg3]

  // TODO: Fix this type assertion
  const { longitude, latitude, height } = normalizeCoordinates(source as any)

  return Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
}
