import * as Cesium from 'cesium'
import { makeDestructurable } from '@vueuse/core'

/**
 * `[longitude, latitude, height]` or `{ longitude, latitude, height }`
 */
export type MaybeCoordinates =
  | (number | string)[]
  | {
    longitude: number | string
    latitude: number | string
    height?: number | string
  }

export function normalizeCoordinates(source: MaybeCoordinates) {
  const value = Array.isArray(source)
    ? {
        longitude: Number(source[0]),
        latitude: Number(source[1]),
        height: source[2] ? Number(source[2]) : undefined,
      }
    : {
        longitude: Number(source.longitude),
        latitude: Number(source.latitude),
        height: source.height ? Number(source.height) : undefined,
      }

  if (Object.values(value).some(val => Number.isNaN(Number(val))))
    throw new Error('[cesium-use] Invalid value which cannot be parsed to number.')

  return value
}

export function toCartesian3(source: Cesium.Cartesian3 | MaybeCoordinates): Cesium.Cartesian3 {
  if (source instanceof Cesium.Cartesian3)
    return source

  const { longitude, latitude, height } = normalizeCoordinates(source)

  return Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
}

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
