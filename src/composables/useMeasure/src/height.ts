import * as Cesium from 'cesium'
import { type Ref, type ShallowRef, computed, ref, shallowRef, watch } from 'vue'
import { defineColor, editEntity, useEntityCollection, useEvent } from '@/index'
import { toCoordinates } from '@/utils/toCoordinates'
import { projectionPosition } from '@/utils/projectionPosition'
import { useGlobePick } from '@/composables/useGlobePick'

export interface HeightOptions {
  format?: (height: number) => string
  heightEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
}

interface HeightEntityData {
  /**
   * All entities in made by `HeightOptions`.
   */
  entities: ReturnType<typeof useEntityCollection>

  /**
   * `[start, end]` positions.
   */
  positions: ShallowRef<Cesium.Cartesian3[]>

  turnPosition: Ref<Cesium.Cartesian3 | undefined>
}

export interface HeightReturn {
  /**
   * Whether the height measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current height measurement entity
   */
  current: ShallowRef<HeightEntityData | undefined>

  /**
   * All height measurement entities
   */
  set: Set<HeightEntityData>

  /**
   * Clear all height measurement entities
   */
  clearAll: () => void
}

const initialEntityProps: Cesium.Entity.ConstructorOptions = {
  point: {
    color: Cesium.Color.WHITE,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 2,
    pixelSize: 6,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  },
  label: {
    showBackground: true,
    fillColor: Cesium.Color.BLACK,
    style: Cesium.LabelStyle.FILL,
    backgroundColor: defineColor('#ffffff/80'),
    font: '14px sans-serif',
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
    pixelOffset: new Cesium.Cartesian2(0, -25),
  },
}

export function height(options: HeightOptions = {}): HeightReturn {
  const {
    heightEntityProps = {},
    turnEntityProps = {},
    endEntityProps = {},
    closeEntityProps = {},
    format = height => `Height: ${(height).toFixed(2)} m`,
  } = options

  const state = ref(false)
  const current = shallowRef<HeightEntityData>()
  const dateSet = new Set<HeightEntityData>()

  const viewer = getViewer()

  const createEntity = (): HeightEntityData => {
    const positions = shallowRef<Cesium.Cartesian3[]>([])
    const entities = useEntityCollection()

    const turnPosition = computed(() => projectionPosition(positions.value[0], positions.value[1]))

    const val = {
      entities,
      positions,
      turnPosition,
    }

    entities.add(editEntity({
      position: new Cesium.CallbackProperty(() => {
        if (positions.value.length !== 2)
          return

        return turnPosition.value
      }, false) as any,
      label: {
        text: new Cesium.CallbackProperty(() => {
          if (positions.value.length !== 2)
            return ''

          const { height: startHeight } = toCoordinates(positions.value[0])
          const { height: turnHeight } = toCoordinates(turnPosition.value!)

          return format(Math.abs(turnHeight! - startHeight!))
        }, false),
      },
    }, initialEntityProps, turnEntityProps))

    entities.add(editEntity({
      position: new Cesium.CallbackProperty(() => positions.value[0], false) as any,
      label: {
        text: 'start',
      },
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          if (positions.value.length !== 2)
            return []

          return [positions.value[0], turnPosition.value, positions.value[1]]
        }, false),
        classificationType: Cesium.ClassificationType.TERRAIN,
        material: defineColor('#ff0000/80'),
        width: 2,
      },
    }, initialEntityProps, heightEntityProps))

    entities.add(editEntity({
      position: new Cesium.CallbackProperty(() => positions.value[1], false) as any,
      label: {
        text: 'end',
      },
    }, initialEntityProps, endEntityProps))

    dateSet.add(val)

    return val
  }

  watch(state, (val) => {
    if (val)
      current.value = createEntity()
  }, {
    immediate: true,
  })

  const globePick = useGlobePick()
  useEvent(({ position }) => {
    const pos = globePick(position)
    if (!pos)
      return

    const picked = viewer.scene.pick(position)
    if (picked && picked?.id && picked?.id?.name === '__cesium-use_measure_height_close') {
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

    const { positions } = current.value

    if (positions.value[0])
      return

    positions.value = [pos, pos]
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  useEvent(({ position }) => {
    if (!state.value || !current.value)
      return

    const pos = globePick(position)
    if (!pos)
      return

    state.value = false

    const { entities, positions } = current.value!

    positions.value = [positions.value[0], pos]

    entities.add(editEntity({
      position: pos,
      name: '__cesium-use_measure_height_close',
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

    current.value = undefined
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

  useEvent(({ endPosition }) => {
    if (!state.value || !current.value || !current.value.positions.value[0])
      return

    const pos = globePick(endPosition)
    if (!pos)
      return

    current.value.positions.value = [current.value.positions.value[0], pos]
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
