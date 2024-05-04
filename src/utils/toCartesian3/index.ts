import * as Cesium from 'cesium'
import type { MaybeCoordinates } from '@/shared/coordinate'

export function toCartesian3(source: Cesium.Cartesian3 | MaybeCoordinates): Cesium.Cartesian3 {
  if (source instanceof Cesium.Cartesian3)
    return source

  const { longitude, latitude, height } = normalizeCoordinates(source)

  return Cesium.Cartesian3.fromDegrees(longitude, latitude, height)
}
