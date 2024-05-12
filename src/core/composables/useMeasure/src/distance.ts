import * as Cesium from 'cesium'
import { type Ref, type ShallowRef, ref, shallowRef, watch } from 'vue'
import { at } from '@s3xysteak/utils'
import { defineColor, editEntity, useEntityCollection, useEvent } from '~/index'
import { useGlobePick } from '~composables/useGlobePick'
import { useViewer } from '~composables/useViewer'

export interface DistanceOptions {
  lineEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
}

interface LineEntityData {
  /**
   * All entities in made by `DistanceOptions`.
   */
  entities: ReturnType<typeof useEntityCollection>

  /**
   * Polyline positions.
   */
  positions: Cesium.Cartesian3[]
}

export interface DistanceReturn {
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

const initialEntityProps: Cesium.Entity.ConstructorOptions = {
  label: {
    showBackground: true,
    fillColor: Cesium.Color.BLACK,
    style: Cesium.LabelStyle.FILL,
    backgroundColor: defineColor('#ffffff/80'),
    font: '14px sans-serif',
    horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: new Cesium.Cartesian2(0, -15),
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
  point: {
    color: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 2,
    pixelSize: 6,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
}

export function distance(options: DistanceOptions = {}): DistanceReturn {
  const {
    lineEntityProps = {},
    startEntityProps = {},
    turnEntityProps = {},
    endEntityProps = {},
    closeEntityProps = {},
  } = options

  const state = ref(false)
  const current = shallowRef<LineEntityData>()
  const dateSet = new Set<LineEntityData>()

  let __pointer: number
  const __currentTurnList = shallowRef<Cesium.Entity[]>([])
  const __fullLength = ref(0)

  const viewer = useViewer()

  const createEntity = (): LineEntityData => {
    const positions: Cesium.Cartesian3[] = []

    const entities = useEntityCollection()

    entities.add(editEntity({
      polyline: {
        width: 2,
        positions: new Cesium.CallbackProperty(() => positions, false),
        clampToGround: true,
        classificationType: Cesium.ClassificationType.TERRAIN,
        material: defineColor('#ff0000/60'),
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

  const globePick = useGlobePick()
  useEvent(({ position }) => {
    const pos = globePick(position)
    if (!pos)
      return

    const picked = viewer.scene.pick(position)
    if (picked && picked?.id && picked?.id?.name === '__cesium-use_measure_distance_close') {
      const entity = picked.id
      dateSet.forEach((data) => {
        const { entities } = data
        if (!entities.contains(entity))
          return

        entities.removeAll()
        dateSet.delete(data)
      })
    }

    if (!state.value || !current.value)
      return

    const { entities, positions } = current.value

    const onFirst = () => {
      entities.add(editEntity({
        position: pos,
        label: {
          text: 'Start',
        },
      }, initialEntityProps, startEntityProps))
    }
    const onNormal = () => {
      const distance = Cesium.Cartesian3.distance(positions[__pointer], pos)
      __fullLength.value += distance
      const turnEntity = entities.add(editEntity({
        position: pos,
        label: {
          text: `${distance.toFixed(2)}m`,
        },
      }, initialEntityProps, turnEntityProps))
      __currentTurnList.value.push(turnEntity)
    }

    __pointer === -1 ? onFirst() : onNormal()

    __pointer++
    positions[__pointer] = pos
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  useEvent(({ position }) => {
    if (!state.value || !current.value)
      return

    const pos = globePick(position)
    if (!pos)
      return

    state.value = false

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
      },
    }, initialEntityProps, endEntityProps))
    entities.add(editEntity({
      position: pos,
      name: '__cesium-use_measure_distance_close',
      label: {
        text: '×',
        font: '16px Helvetica',
        fillColor: Cesium.Color.RED,
        showBackground: true,
        backgroundColor: Cesium.Color.WHITE,
        backgroundPadding: new Cesium.Cartesian2(2, 2.5),
        pixelOffset: new Cesium.Cartesian2(20, 0),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
    }, closeEntityProps))
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

  useEvent(({ endPosition }) => {
    if (!state.value || !current.value)
      return

    const pos = globePick(endPosition)
    if (!pos)
      return

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
