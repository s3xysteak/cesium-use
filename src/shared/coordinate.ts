import * as Cesium from 'cesium'

export type MaybeCartesian3OrLonLat = Cesium.Cartesian3 | (number | string)[]

export function toCartesian3(source: MaybeCartesian3OrLonLat) {
  if (source instanceof Cesium.Cartesian3) {
    return source
  }

  if (
    source.some((val, index) => {
      if (index === 2 && isUndefined(val)) return false

      return Number.isNaN(Number(val))
    })
  )
    throw new Error('Invalid value which cannot be parsed to number.')

  const [lon, lat, alt = 0] = source

  return Cesium.Cartesian3.fromDegrees(Number(lon), Number(lat), Number(alt))
}
