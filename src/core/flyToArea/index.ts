import * as Cesium from 'cesium'
import type { MaybeCoordinates } from '@/shared/coordinate'
import { toCartesian3 } from '@/utils/toCartesian3'

export interface FlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

export function flyToArea(
  posList: (MaybeCoordinates | Cesium.Cartesian3)[],
  options?: Partial<FlyToAreaOptions>,
) {
  const { onSingle, onEmpty } = options ?? {}

  const viewer = getViewer()

  if (posList.length === 0) {
    onEmpty && onEmpty()
    return
  }
  if (posList.length === 1) {
    onSingle
      ? onSingle()
      : viewer.camera.flyTo({
        destination: toCartesian3(posList[0]),
      })
    return
  }

  const pointsPosList = posList.map(item => toCartesian3(item))

  viewer.camera.flyToBoundingSphere(
    Cesium.BoundingSphere.fromPoints(pointsPosList),
  )
}
