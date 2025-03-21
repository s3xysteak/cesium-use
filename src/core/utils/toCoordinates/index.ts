import { makeDestructurable } from '@vueuse/core'
import { type MaybeCoordinates, normalizeCoordinates } from '~shared/coordinate'
import * as Cesium from 'cesium'

/**
 * Normalized Cartesian3/coordinates/... to coordinates.
 *
 * ## example
 * ```js
 * toCoordinates([120, 80])
 * toCoordinates([120, 80, 1000])
 * toCoordinates(Cesium.Cartesian3.fromDegrees(120, 80))
 * ```
 */
export function toCoordinates(source: Cesium.Cartesian3 | MaybeCoordinates) {
  const createReturns = (
    longitude: number,
    latitude: number,
    height: number | undefined,
  ) => makeDestructurable(
    {
      longitude,
      latitude,
      height,
    },
    [
      longitude,
      latitude,
      height,
    ],
  )

  if (source instanceof Cesium.Cartesian3) {
    const { longitude: _longitude, latitude: _latitude, height } = Cesium.Cartographic.fromCartesian(source)
    const longitude = Cesium.Math.toDegrees(_longitude)
    const latitude = Cesium.Math.toDegrees(_latitude)

    return createReturns(longitude, latitude, height)
  }

  const { longitude, latitude, height } = normalizeCoordinates(source)

  return createReturns(longitude, latitude, height)
}
