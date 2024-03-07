import * as Cesium from 'cesium'
import type { maybeCartesian3OrLonLat } from '@/shared/coordinate'

export interface FlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

export function flyToArea(
  posList: maybeCartesian3OrLonLat[],
  options?: Partial<FlyToAreaOptions>
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
          destination: toCartesian3(posList[0])
        })
    return
  }

  const pointsPosList = posList.map(item => toCartesian3(item))

  viewer.camera.flyToBoundingSphere(
    Cesium.BoundingSphere.fromPoints(pointsPosList)
  )
}
