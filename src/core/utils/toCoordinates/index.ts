import * as Cesium from 'cesium'
import { makeDestructurable } from '@vueuse/core'
import { type MaybeCoordinates, normalizeCoordinates } from '@/shared/coordinate'

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
