import { isUndefined } from '@s3xysteak/utils'
import { throwError } from '~shared/errorHandler'

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

  if (Object.entries(value).some(([k, v]) => {
    if (k === 'height')
      return isUndefined(v) ? false : Number.isNaN(v)

    return Number.isNaN(v)
  }))
    throwError('Invalid value which cannot be parsed to number.')

  return value
}
