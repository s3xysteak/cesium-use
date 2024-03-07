import * as Cesium from 'cesium'

export type NumberOrString = number | string

export type MaybeCartesian3 =
  | Cesium.Cartesian3
  | [NumberOrString, NumberOrString]
  | [NumberOrString, NumberOrString, NumberOrString]

export function toCartesian3(source: MaybeCartesian3) {
  if (source instanceof Cesium.Cartesian3) {
    return source
  }

  if (source.some(val => Number.isNaN(Number(val))))
    throw new Error('Invalid value which cannot be parsed to number.')

  const [lon, lat, alt = 0] = source

  return Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), Number(alt))
}
