import * as Cesium from 'cesium'
import type { MaybeCoordinates } from '~shared/coordinate'
import { toCartesian3 } from '~utils/toCartesian3'
import { useViewer } from '~composables/useViewer'

export interface UseFlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

export function useFlyToArea(viewer = useViewer()) {
  return (
    posList: (MaybeCoordinates | Cesium.Cartesian3)[],
    options?: Partial<UseFlyToAreaOptions>,
  ) => {
    const { onSingle, onEmpty } = options ?? {}

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
}
