import * as Cesium from 'cesium'
import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { useMagicKeys } from '@vueuse/core'

export interface MoveByKeyboardOptions {
  distancePerFrame?: MaybeRefOrGetter<number>
}

export function moveByKeyboard(options: MoveByKeyboardOptions = {}) {
  const { distancePerFrame = 4 } = options

  const viewer = getViewer()
  const { w, s, a, d, shift, space } = useMagicKeys()
  const magicKeys = { w, s, a, d, shift, space }

  const camera = viewer.camera

  const keyToCameraMoveMap: Record<string, (num: number) => void> = {
    w: num =>
      camera.move(
        Cesium.Cartesian3.negate(
          getXVector(camera.direction, camera.position),
          new Cesium.Cartesian3()
        ),
        num
      ),
    s: num => camera.move(getXVector(camera.direction, camera.position), num),
    a: num => camera.moveLeft(num),
    d: num => camera.moveRight(num),
    shift: num =>
      camera.move(
        Cesium.Cartesian3.negate(
          Cesium.Cartesian3.normalize(camera.position, new Cesium.Cartesian3()),
          new Cesium.Cartesian3()
        ),
        num
      ),
    space: num =>
      camera.move(
        Cesium.Cartesian3.normalize(camera.position, new Cesium.Cartesian3()),
        num
      )
  }

  const move = (key: string) => {
    const requestIdList: number[] = []

    const start = () => {
      const id = requestAnimationFrame(start)
      requestIdList.push(id)

      keyToCameraMoveMap[key](toValue(distancePerFrame))
    }
    const end = () => {
      requestIdList.forEach(id => {
        cancelAnimationFrame(id)
      })
      requestIdList.length = 0
    }

    const animate = (val: boolean) => {
      val ? start() : end()
    }

    return { animate }
  }

  for (let [key, value] of Object.entries(magicKeys)) {
    const { animate } = move(key)
    watchEffect(() => {
      animate(value.value)
    })
  }
}

function getXVector(
  vectorA: Cesium.Cartesian3,
  vectorB: Cesium.Cartesian3
): Cesium.Cartesian3 {
  const vectorN = Cesium.Cartesian3.cross(
    vectorA,
    vectorB,
    new Cesium.Cartesian3()
  )
  const result = Cesium.Cartesian3.cross(
    vectorN,
    vectorB,
    new Cesium.Cartesian3()
  )

  return Cesium.Cartesian3.normalize(result, new Cesium.Cartesian3())
}
