import { area, type AreaOptions, type AreaReturn } from './src/area'
import { distance, type DistanceOptions, type DistanceReturn } from './src/distance'
import { height, type HeightOptions, type HeightReturn } from './src/height'

type UseMeasureType = 'area' | 'distance' | 'height'
type UseMeasureOptions = AreaOptions | DistanceOptions | HeightOptions
type UseMeasureReturns = AreaReturn | DistanceReturn | HeightReturn

export function useMeasure(type: 'area', options?: AreaOptions): AreaReturn
export function useMeasure(type: 'distance', options?: DistanceOptions): DistanceReturn
export function useMeasure(type: 'height', options?: HeightOptions): HeightReturn
export function useMeasure(type: UseMeasureType, options?: UseMeasureOptions): UseMeasureReturns {
  const typeMap = {
    area,
    distance,
    height,
  }

  return typeMap[type](options)
}
