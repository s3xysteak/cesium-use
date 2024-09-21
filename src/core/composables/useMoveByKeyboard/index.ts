import { useMagicKeys } from '@vueuse/core'
import { useViewer } from '~composables/useViewer'
import * as Cesium from 'cesium'
import { type MaybeRefOrGetter, toValue, watchEffect } from 'vue'

export type UseMoveByKeyboardKeybindingList =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'down'
  | 'up'
export interface UseMoveByKeyboardOptions {
  distancePerFrame?: MaybeRefOrGetter<number>
  keybinding?: Partial<Record<UseMoveByKeyboardKeybindingList, string>>
}

/**
 * Moving parallel to the ground.
 *
 * To move forward, backward, left, and right, use `W S A D`. Press `Shift` to move downward and `Space` to move upward.
 */
export function useMoveByKeyboard(options: UseMoveByKeyboardOptions = {}) {
  const { distancePerFrame = 4, keybinding: _keybinding } = options
  const keybinding: Record<UseMoveByKeyboardKeybindingList, string>
    = Object.assign(
      {
        forward: 'w',
        backward: 's',
        left: 'a',
        right: 'd',
        down: 'shift',
        up: 'space',
      },
      _keybinding,
    )

  const keys = useMagicKeys()
  const magicKeys = {
    forward: keys[keybinding.forward],
    backward: keys[keybinding.backward],
    left: keys[keybinding.left],
    right: keys[keybinding.right],
    down: keys[keybinding.down],
    up: keys[keybinding.up],
  }

  const camera = useViewer().camera

  const keyToCameraMoveMap: Record<
    UseMoveByKeyboardKeybindingList,
    (num: number) => void
  > = {
    forward: num =>
      camera.move(
        Cesium.Cartesian3.negate(
          getXVector(camera.direction, camera.position),
          new Cesium.Cartesian3(),
        ),
        num,
      ),
    backward: num =>
      camera.move(getXVector(camera.direction, camera.position), num),
    left: num => camera.moveLeft(num),
    right: num => camera.moveRight(num),
    down: num =>
      camera.move(
        Cesium.Cartesian3.negate(
          Cesium.Cartesian3.normalize(camera.position, new Cesium.Cartesian3()),
          new Cesium.Cartesian3(),
        ),
        num,
      ),
    up: num =>
      camera.move(
        Cesium.Cartesian3.normalize(camera.position, new Cesium.Cartesian3()),
        num,
      ),
  }

  const move = (key: UseMoveByKeyboardKeybindingList) => {
    const requestIdList: number[] = []

    const start = () => {
      const id = requestAnimationFrame(start)
      requestIdList.push(id)

      const speed = toValue(distancePerFrame)
      if (speed === 0)
        return
      keyToCameraMoveMap[key](speed)
    }
    const end = () => {
      requestIdList.forEach((id) => {
        cancelAnimationFrame(id)
      })
      requestIdList.length = 0
    }

    const animate = (val: boolean) => {
      val ? start() : end()
    }

    return { animate }
  }

  for (const [key, value] of Object.entries(magicKeys)) {
    const { animate } = move(key as any)
    watchEffect(() => {
      animate(value.value)
    })
  }
}

function getXVector(
  vectorA: Cesium.Cartesian3,
  vectorB: Cesium.Cartesian3,
): Cesium.Cartesian3 {
  const vectorN = Cesium.Cartesian3.cross(
    vectorA,
    vectorB,
    new Cesium.Cartesian3(),
  )
  const result = Cesium.Cartesian3.cross(
    vectorN,
    vectorB,
    new Cesium.Cartesian3(),
  )

  return Cesium.Cartesian3.normalize(result, new Cesium.Cartesian3())
}
