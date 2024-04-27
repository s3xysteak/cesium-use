import * as Cesium from 'cesium'
import { type Ref, type ShallowRef, ref, shallowRef, watch } from 'vue'
import { editEntity, entityCollection, useEvent } from '@/index'
import { at } from '@/shared/general'

interface UseMeasureDistanceOptions {
  lineEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
}

interface LineEntityData {
  /**
   * All entities in made by `UseMeasureDistanceOptions`.
   */
  entities: ReturnType<typeof entityCollection>

  /**
   * Polyline positions.
   */
  positions: Cesium.Cartesian3[]
}

interface UseMeasureDistanceReturn {
  /**
   * Whether the distance measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current distance measurement entity
   */
  current: ShallowRef<LineEntityData | undefined>

  /**
   * All distance measurement entities
   */
  set: Set<LineEntityData>

  /**
   * Clear all distance measurement entities
   */
  clearAll: () => void
}

export function useMeasureDistance(options: UseMeasureDistanceOptions = {}): UseMeasureDistanceReturn {
  const {
    lineEntityProps = {},
    endEntityProps = {},
    startEntityProps = {},
    turnEntityProps = {},
  } = options

  const viewer = getViewer()

  const state = ref(false)
  const current = shallowRef<LineEntityData>()
  const dateSet = new Set<LineEntityData>()

  let __pointer: number
  const __currentTurnList = shallowRef<Cesium.Entity[]>([])
  const __fullLength = ref(0)

  const createEntity = (): LineEntityData => {
    const positions: Cesium.Cartesian3[] = []

    const entities = entityCollection()

    entities.add(editEntity({
      polyline: {
        positions: new Cesium.CallbackProperty(() => positions, false),
        clampToGround: true,
        classificationType: Cesium.ClassificationType.TERRAIN,
      },
    }, lineEntityProps))

    const val = {
      entities,
      positions,
    }
    dateSet.add(val)

    return val
  }

  watch(state, (val) => {
    if (val) {
      current.value = createEntity()
      __pointer = -1
      __currentTurnList.value = []
      __fullLength.value = 0
    }
  }, {
    immediate: true,
  })

  useEvent(({ position }) => {
    if (!state.value || !current.value)
      return

    const pos = viewer.scene.pickPosition(position)

    const { entities, positions } = current.value

    const onFirst = () => {
      entities.add(editEntity({
        position: pos,
        label: {
          text: 'Start',
          showBackground: true,
          font: '16px sans-serif',
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -15),
        },
      }, startEntityProps))
    }
    const onNormal = () => {
      const distance = Cesium.Cartesian3.distance(positions[__pointer], pos)
      __fullLength.value += distance
      const turnEntity = entities.add(editEntity({
        position: pos,
        label: {
          text: `${distance.toFixed(2)}m`,
          showBackground: true,
          font: '16px sans-serif',
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -15),
        },
      }, turnEntityProps))
      __currentTurnList.value.push(turnEntity)
    }

    __pointer === -1 ? onFirst() : onNormal()

    __pointer++
    positions[__pointer] = pos
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  useEvent(({ position }) => {
    state.value = false

    const pos = viewer.scene.pickPosition(position)

    const { entities } = current.value!

    const shouldBeRemoved = [at(__currentTurnList.value, -1), at(__currentTurnList.value, -2)]

    shouldBeRemoved.forEach((last) => {
      entities.removeById(last.id)
      __currentTurnList.value.pop()
    })

    entities.add(editEntity({
      position: pos,
      label: {
        text: `Sum length: ${__fullLength.value.toFixed(2)}m`,
        showBackground: true,
        font: '16px sans-serif',
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -15),
      },
    }, endEntityProps))
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

  useEvent(({ endPosition }) => {
    if (!state.value || !current.value)
      return

    const pos = viewer.scene.pickPosition(endPosition)
    current.value.positions[__pointer + 1] = pos
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

  function clearAll() {
    state.value = false
    current.value = undefined

    dateSet.forEach(({ entities }) => {
      entities.removeAll()
    })
    dateSet.clear()
  }

  return {
    state,
    current,
    set: dateSet,
    clearAll,
  }
}
